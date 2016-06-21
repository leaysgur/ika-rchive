// @flow
const Const = require('../const');
const Util  = require('../util');
const BaseModel = require('./_base');

class RecordModel extends BaseModel {
  items: Object[];

  constructor() {
    super('IA_RECORD', {
      'items': []
    });
  }

  setRecord(state: {
    result:    Result;
    missmatch: boolean;
    tagmatch:  boolean;
    rule:      Rule;
    stage:     'stageA' | 'stageB';
    stageA:    Stage;
    stageB:    Stage;
    rateRank:  string;
    rateScore: string;
    kill:      string;
    death:     string;
  }) {

    let items = this.get('items');
    // リスト追加
    items.push(this._preSave(state));
    // data.lengthはLIMITを超えないし、超えたら先頭が消える
    while (items.length > Const.RECORD_LIMIT) {
      items.shift();
    }

    this.set('items', items);
  }

  // といいつつ修正するコ
  _preSave(state) {
    const record = {
      result:    parseInt(state.result, 10),
      missmatch: state.missmatch ? 1 : 0,
      tagmatch:  state.tagmatch ? 1 : 0,
      rule:      parseInt(state.rule, 10),
      stage:     parseInt(state[state.stage], 10),
      rate:      parseInt(state.rateRank, 10) + parseInt(state.rateScore, 10),
      kill:      parseInt(state.kill, 10),
      death:     parseInt(state.death, 10),
      // 登録日はココでいれる
      createdAt: Date.now(),
    };

    // 回線落ちならミスマッチではない
    const isDisconnected: boolean = Util.isDisconnected(record.result);
    if (isDisconnected) { record.missmatch = 0; }

    // ありえない入力は0にする
    let isValidRate = Util.isValidRate(record.rate);
    if (!isValidRate) { record.rate = 0; }

    return record;
  }

  getRecord(idx: number) {
    return this.get('items')[idx];
  }

  updateRecord(idx: number, state) {
    const record = {
      result:    state.result|0,
      missmatch: state.missmatch|0,
      tagmatch:  state.tagmatch|0,
      rule:      state.rule|0,
      stage:     state.stage|0,
      rate:      state.rate|0,
      kill:      state.kill|0,
      death:     state.death|0,
      createdAt: state.createdAt,
    };

    let items = this.get('items');
    items.splice(idx, 1, this._preSave(record));
    this.set('items', items);
  }


  removeRecord(idx: number) {
    let items = this.get('items');
    items.splice(idx, 1);
    this.set('items', items);
  }

  getLatestRecord() {
    let items = this.get('items');
    return items[items.length - 1];
  }

  clearAllData(): void { this._clear(); }
}

let instance: ?RecordModel = null;
module.exports = {
  getInstance: (): ?RecordModel => {
    if (instance === null) {
      instance = new RecordModel();
    }

    return instance;
  }
};
