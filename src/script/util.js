'use strict';
let Const = require('./const');
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
    for (let k in Const.RATE_WAIT) {
      if (wait === Const.RATE_WAIT[k]) {
        label = k;
        break;
      }
    }

    return label + rate;
  },

  getRateFromRateStr: (str) => {
    let reg = rateStrReg.exec(str);
    if (!reg) { return 0; }
    return Const.RATE_WAIT[reg[1]] + (reg[2]|0);
  },

  isValidRate: (score) => {
    let TABLE = Const.RATE_WAIT;
    let RATE_VALUES = Object.keys(TABLE).map((key) => { return TABLE[key]; })

    let min = Math.min.apply(null, RATE_VALUES) + Const.MIN_RATE_INPUT;
    let max = Math.max.apply(null, RATE_VALUES) + Const.MAX_RATE_INPUT;

    return min <= score && score < max;
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
  }
};
