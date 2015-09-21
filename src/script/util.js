'use strict';
let Const = require('./const');

module.exports = {
  isMobile: function() {
    return 'ontouchstart' in document;
  },

  formatDate: function(time) {
    if (!time) { return ''; }
    let date = new Date(time);
    let YYYY = date.getFullYear();
    let MM   = ('0' + (date.getMonth() + 1)).slice(-2);
    let DD   = ('0' + date.getDate()).slice(-2);
    let hh   = ('0' + date.getHours()).slice(-2);
    let mm   = ('0' + date.getMinutes()).slice(-2);

    return `${YYYY}/${MM}/${DD} ${hh}:${mm}`;
  },

  getRateStr: function(val) {
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

  getRateFromRateStr: function(str) {
    let reg = /(\w[+-]?)(\d+)/.exec(str);
    if (!reg) { return 0; }
    return Const.RATE_WAIT[reg[1]] + (reg[2]|0);
  },

  objToOptionsArr: function(obj, isReverse) {
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

  percentage: function(c, p) {
    if (c === 0 || p === 0) { return 0; }
    return ((c / p) * 100).toFixed(2);
  }
};
