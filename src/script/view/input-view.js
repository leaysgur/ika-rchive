'use strict';
var Vue   = require('vue');
var Const = require('../const');
var Util  = require('../util');
var RecordModel = require('../model/record-model').getInstance();

module.exports = Vue.extend({
  el: function() { return '#js-view-input'; },
  data: function() {
    return {
      result:     null,
      rule:       null,
      stage:      null,
      rate_rank:  null,
      rate_score: null,

      results: Const.RESULT,
      rules:   Const.RULE,
      stages:  Util.objToOptionsArr(Const.STAGE),
      rates:   Util.objToOptionsArr(Const.RATE_WAIT, 'REVERSE')
    };
  },
  methods: {
    onClickSet: function() {
      var record = {
        result: this.result|0,
        rule:   this.rule|0,
        stage:  this.stage|0,
        rate:   (this.rate_rank|0) + (this.rate_score|0)
      };
      RecordModel.set(record);
    }
  }
});
