'use strict';
let Const = require('../const');
let Util  = require('../util');
let Eve   = require('../util/eve');

class API {
  constructor() {
  }

  fetchRuleAndStages(onSucess, onFail) {
    let url = Const.ENDPOINT.RULE_STAGE;

    return this._fetch(url, (data) => {
      onSucess(this._parseRuleAndStages(data));
    }, onFail);
  }

  _parseRuleAndStages(data) {
    let now = Date.now();
    // 配列で3つ順に返ってくるのが、たぶんイカリングの表示順(直近->未来)なはず
    // 更新タイミングで前にずれてくると信じてもう終わってるなら次を見る
    let term = data['schedule'][0];
    if (term['endTime'] < now) { term = data['schedule'][1]; }
    if (term['endTime'] < now) { term = data['schedule'][2]; }

    let rule   = term['ranked']['rulesJP'];
    let stageA = term['ranked']['maps'][0]['nameJP'];
    let stageB = term['ranked']['maps'][1]['nameJP'];

    return {
      rule:   Util.getRuleFromRuleStr(rule),
      stageA: Util.getStageFromStageStr(stageA),
      stageB: Util.getStageFromStageStr(stageB)
    };
  }

  _fetch(url, onSucess, onFail) {
    Eve.emit('preXhr');

    let xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = 1000 * 5;

    xhr.onload = () => {
      if (xhr.readyState === 4 && xhr.status === 200) {
        onSucess(xhr.response);
      } else {
        onFail();
      }

      Eve.emit('postXhr');
    };
    xhr.onerror = xhr.ontimeout = xhr.onabort = () => {
      onFail();

      Eve.emit('postXhr');
    };

    xhr.open('GET', url, true);
    xhr.send(null);
  }
}

module.exports = (new API());
