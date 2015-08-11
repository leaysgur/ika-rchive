'use strict';
var Const = require('../const');
var Util  = require('../util');
var RecordModel = require('../model/record-model').getInstance();

module.exports = {
  el: '#js-view-list',
  data: {
    records: RecordModel.data,
    recordsList: []
  },
  events: {
    'hook:created': function() { this._syncListData(); }
  },
  watch: {
    records: function() { this._syncListData(); }
  },
  methods: {
    onClickDel: function(idx) {
      RecordModel.remove(idx);
    },
    _syncListData: function() {
      this.recordsList = this._toListData(this.records);
    },
    _toListData: function(records) {
      return records.map(function(item, idx) {
        return {
          idx:       idx,
          id:        idx + 1,
          rule:      Const.RULE[item.rule],
          stage:     Const.STAGE[item.stage],
          result:    Const.RESULT[item.result],
          missmatch: !!item.missmatch,
          rate:      Util.getRateStr(item.rate)
        };
      });
    }
  }
};
