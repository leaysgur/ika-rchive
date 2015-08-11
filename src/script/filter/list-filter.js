'use strict';
var Vue   = require('vue');
var Const = require('../const');
var Util  = require('../util');

Vue.filter('listRecords', function (records) {
  return records.map(function(item, idx) {
    return {
      idx:    idx,
      id:     idx + 1,
      rule:   Const.RULE[item.rule],
      stage:  Const.STAGE[item.stage],
      result: Const.RESULT[item.result],
      rate:   Util.getRateStr(item.rate)
    };
  });
});
