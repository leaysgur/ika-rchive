'use strict';
var Const = require('../const');
var Util  = require('../util');
var RecordModel = require('../model/record-model').getInstance();

module.exports = {
  el: '#js-view-input',
  data: {
    result:     1,
    rule:       1,
    stage:      1,
    rate_rank:  600,
    rate_score: '',
    missmatch:  false,

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
        stage:     this[this.chosen_stage]|0,
        rate:      (this.rate_rank|0) + (this.rate_score|0)
      };
      console.log('this.chosen_stage', this.chosen_stage);
      RecordModel.set(record);

      this._cleanUpInput();
      this._showReaction();
    },
    _cleanUpInput: function() {
      this.rate_score = '';
      this.missmatch  = false;
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
