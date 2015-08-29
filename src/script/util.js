'use strict';
var Const = require('./const');
module.exports = {
  formatDate: function(time) {
    if (!time) { return ''; }
    var date = (new Date(time)).toJSON();
    var dateArr = date.split('T');
    var fmd = dateArr[0].replace(/-/g, '/');
    var hm  = dateArr[1].split(':').slice(0,2).join(':');
    return fmd + ' ' + hm;
  },

  getRateStr: function(val) {
    if (typeof val === 'object') {
      val = val.value;
    }

    var rate = val % 100;
    var wait = val - rate;

    var label = '';
    for (var k in Const.RATE_WAIT) {
      if (wait === Const.RATE_WAIT[k]) {
        label = k;
        break;
      }
    }

    return label + rate;
  },

  objToOptionsArr: function(obj, isReverse) {
    var ret = [];
    for (var key in obj) {
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
