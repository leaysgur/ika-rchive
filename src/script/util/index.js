'use strict';
let Const = require('../const');
let rateStrReg = /(\w[+-]?)(\d+)/;

module.exports = {
  isMobile: () => {
    return 'ontouchstart' in document;
  },

  formatDate: (time) => {
    if (!time) { return ''; }
    let date = new Date(time);
    let YYYY = date.getFullYear();
    let MM   = ('0' + (date.getMonth() + 1)).slice(-2);
    let DD   = ('0' + date.getDate()).slice(-2);
    let hh   = ('0' + date.getHours()).slice(-2);
    let mm   = ('0' + date.getMinutes()).slice(-2);

    return `${YYYY}/${MM}/${DD} ${hh}:${mm}`;
  },

  getRateStr: (val) => {
    if (typeof val === 'object') {
      val = val.value;
    } else {
      val = val|0;
    }

    let rate = val % 100;
    let wait = val - rate;

    let label = '';
    for (let k in Const.RATE_TABLE) {
      if (wait === Const.RATE_TABLE[k]) {
        label = k;
        break;
      }
    }

    // 現時点で最高のS+99より上の範囲を見る必要が出てくるとコレ
    if (label.length === 0) {
      // label = Const.MAX_RATE_STR;
      // rate  = Const.MAX_RATE_INPUT;
      // これで S+99 って出せるけど、グラフ的にしっくりこない
      // なぜなら範囲が広すぎるとこれが何個も出るからである
      return 'MAX';
    }

    return label + rate;
  },

  getRateFromRateStr: (str) => {
    let reg = rateStrReg.exec(str);
    if (!reg) { return 0; }
    return Const.RATE_TABLE[reg[1]] + (reg[2]|0);
  },

  isValidRate: (score) => {
    let min = Const.RATE_TABLE[Const.MIN_RATE_STR] + Const.MIN_RATE_INPUT;
    let max = Const.RATE_TABLE[Const.MAX_RATE_STR] + Const.MAX_RATE_INPUT;

    return min <= score && score <= max;
  },

  objToOptionsArr: (obj, isReverse) => {
    let ret = [];
    for (let key in obj) {
      if (isReverse) {
        ret.push({
          text:  key,
          value: obj[key]
        });
      } else {
        ret.push({
          text:  obj[key],
          value: key
        });
      }
    }

    return ret;
  },

  percentage: (c, p) => {
    if (c === 0 || p === 0) { return 0; }
    return ((c / p) * 100).toFixed(2);
  },

  // 値の入力欄のチェック
  canInput: (rateScoreStr) => {
    // 自由入力が空のとこだけでも縛る
    if (rateScoreStr.length === 0) {
      return false;
    }
    // 0 - 99以外の値は弾く
    let score = rateScoreStr|0;
    if (score < Const.MIN_RATE_INPUT || Const.MAX_RATE_INPUT < score) {
      return false;
    }

    return true;
  },

  isDisconnected: (result) => {
    result = result|0;
    return result === Const.RESULT_STR.DISCONNECTED;
  },

  isWin: (result) => {
    result = result|0;

    if (result === Const.RESULT_STR.WIN ||
        result === Const.RESULT_STR.KO_WIN) {
      return true;
    }
    return false;
  }
};
