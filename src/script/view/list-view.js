'use strict';
var Vue   = require('vue');
var Const = require('../const');
var Util  = require('../util');
var RecordModel = require('../model/record-model');
var record = RecordModel.getInstance();

module.exports = Vue.extend({
  el: function() { return '#js-view-list'; },
  computed: {
    record: function() { return this._toView(); }
  },
  methods: {
    _toView: function() {
      return record._data.map(function(item) {
        return {
          id:     item._id,
          rule:   Const.RULE[item.rule],
          stage:  Const.STAGE[item.stage],
          result: Const.RESULT[item.result],
          rate:   Util.getRateStr(item.rate)
        };
      });
    }
  }
});
