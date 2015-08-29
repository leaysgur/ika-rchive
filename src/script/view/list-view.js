'use strict';
var Const = require('../const');
var Util  = require('../util');
var RecordModel = require('../model/record-model').getInstance();

module.exports = {
  el: '#js-view-list',
  data: {
    records: RecordModel.data,
    recordsList: [],

    // 修正用
    isModifying:  false,
    modifyingIdx: null,
    modRule:      1,
    modStage:     1,
    modResult:    1,
    modMissmatch: false,
    modTagmatch:  false,
    modRateRank:  600,
    modRateScore: null,
    results: Const.RESULT,
    rules:   Const.RULE,
    stages:  Util.objToOptionsArr(Const.STAGE),
    rates:   Util.objToOptionsArr(Const.RATE_WAIT, 'REVERSE'),
  },
  events: {
    'hook:created': function() { this._syncListData(); }
  },
  watch: {
    records: function() { this._syncListData(); }
  },
  methods: {
    onClickMod: function(idx) {
      if (this.modifyingIdx === idx) {
        this._cancelMod();
        return;
      }
      this.isModifying  = true;
      this.modifyingIdx = idx;
      var item = RecordModel.get(idx);

      this.modCreatedAt = item.createdAt;
      this.modRule      = item.rule;
      this.modStage     = item.stage;
      this.modResult    = item.result;
      this.modMissmatch = item.missmatch;
      this.modTagmatch  = item.tagmatch;
      var rateRank = ((item.rate / 100)|0) * 100;
      this.modRateRank  = rateRank;
      this.modRateScore = item.rate - rateRank;
    },
    onClickModComplete: function() {
      var record = {
        createdAt: this.modCreatedAt,
        result:    this.modResult|0,
        missmatch: this.modMissmatch,
        tagmatch:  this.modTagmatch,
        rule:      this.modRule|0,
        stage:     this.modStage|0,
        rate:      (this.modRateRank|0) + (this.modRateScore|0)
      };
      RecordModel.update(this.modifyingIdx, record);
      this._cancelMod();
    },
    onClickDel: function(idx) {
      RecordModel.remove(idx);
    },
    _cancelMod: function() {
      this.isModifying  = false;
      this.modifyingIdx = null;
    },
    _syncListData: function() {
      this.recordsList = this._toListData(this.records);
    },
    _toListData: function(records) {
      return records.map(function(item, idx) {
        return {
          idx:       idx,
          id:        idx + 1,
          createdAt: Util.formatDate(item.createdAt),
          rule:      Const.RULE[item.rule],
          stage:     Const.STAGE[item.stage],
          result:    Const.RESULT[item.result],
          missmatch: !!item.missmatch,
          tagmatch:  !!item.tagmatch,
          rate:      Util.getRateStr(item.rate)
        };
      });
    }
  }
};
