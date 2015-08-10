'use strict';
var Vue   = require('vue');
var Const = require('../const');
var Util  = require('../util');

Vue.filter('listFilter', function (records) {
  return records.map(function(item) {
    return {
      id:     item._id,
      rule:   Const.RULE[item.rule],
      stage:  Const.STAGE[item.stage],
      result: Const.RESULT[item.result],
      rate:   Util.getRateStr(item.rate)
    };
  });
});
