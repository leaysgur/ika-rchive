'use strict';
var Const = require('./const');
module.exports = {
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
  }
};
