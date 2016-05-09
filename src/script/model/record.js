const Const = require('../const');
const Util  = require('../util');
const BaseModel = require('./_base');

class RecordModel extends BaseModel {
  constructor() {
    super('IA_RECORD', {
      'items': []
    });
  }

  // といいつつ修正するコ
  _preSave(record) {
    // 回線落ちならミスマッチではない
    let isDisconnected = Util.isDisconnected(record.result);
    if (isDisconnected) { record.missmatch = false; }

    // ありえない入力は0にする
    let isValidRate = Util.isValidRate(record.rate);
    if (!isValidRate) { record.rate = 0; }

    return record;
  }

  setRecord(state) {
    const record = {
      result:    state.result|0,
      missmatch: state.missmatch|0,
      tagmatch:  state.tagmatch|0,
      rule:      state.rule|0,
      stage:     state[state.stage]|0,
      rate:      (state.rateRank|0) + (state.rateScore|0),
      // 登録日はココでいれる
      createdAt: Date.now(),
    };

    let items = this.get('items');
    // リスト追加
    items.push(this._preSave(record));
    // data.lengthはLIMITを超えないし、超えたら先頭が消える
    while (items.length > Const.RECORD_LIMIT) {
      items.shift();
    }

    this.set('items', items);
  }

  getRecord(idx) {
    return this.get('items')[idx];
  }

  update(idx, record) {
    let items = this.get('items');
    items.splice(idx, 1, this._preSave(record));
    this.set('items', items);
  }

  remove(idx) {
    let items = this.get('items');
    items.splice(idx, 1);
    this.set('items', items);
  }

  getLatestRecord() {
    let items = this.get('items');
    return items[items.length - 1];
  }

  getLatestRate() {
    const ret = {
      rank:  '',
      score: ''
    };
    const latest = this.getLatestRecord();
    if (!latest) {
      return ret;
    }

    const rate = '' + latest.rate;
    ret.score = rate.slice(-2)|0;
    ret.rank  = (rate|0) - ret.score;
    return ret;
  }

  clearAllData() { this._clear(); }
}

let instance = null;
module.exports = {
  getInstance: () => {
    if (instance === null) {
      instance = new RecordModel();
    }

    return instance;
  }
};
