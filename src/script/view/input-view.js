'use strict';
var Const = require('../const');
var Util  = require('../util');
var RecordModel = require('../model/record-model').getInstance();

module.exports = {
  el: '#js-view-input',
  data: {
    result:      1,
    rule:        1,
    rateRank:    600,
    rateScore:   '',
    stageA:      1,
    stageB:      2,
    chosenStage: 'stageA',
    missmatch:   false,

    results: Const.RESULT,
    rules:   Const.RULE,
    stages:  Util.objToOptionsArr(Const.STAGE),
    rates:   Util.objToOptionsArr(Const.RATE_WAIT, 'REVERSE'),

    _timer:          null,
    showSetReaction: false
  },
  computed: {
    isResultWin: function() {
      var isWin = (this.result|0) % 2;
      return !!isWin;
    }
  },
  methods: {
    onClickSet: function() {
      var record = {
        result:    this.result|0,
        missmatch: (this.isResultWin ? false : (this.missmatch|0)),
        rule:      this.rule|0,
        stage:     this[this.chosenStage]|0,
        rate:      (this.rateRank|0) + (this.rateScore|0)
      };
      RecordModel.set(record);

      this._cleanUpInput();
      this._showReaction();
    },
    _cleanUpInput: function() {
      this.rateScore = '';
      this.missmatch = false;
    },
    _showReaction: function() {
      var that = this;
      this.showSetReaction = true;
      this._timer = setTimeout(function() {
        that.showSetReaction = false;
      }, 750);
    }
  }
};
