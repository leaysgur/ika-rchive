'use strict';
var Const = require('../const');
var Util  = require('../util');
var RecordModel = require('../model/record-model').getInstance();
var UserModel   = require('../model/user-model').getInstance();

module.exports = {
  el: '#js-view-input',
  data: {
    result:      1,
    rule:        1,
    rateRank:    (UserModel.get('lastRank')|0) || 600,
    rateScore:   '',
    stageA:      1,
    stageB:      2,
    chosenStage: 'stageA',
    missmatch:   false,
    tagmatch:    false,

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
    },
    canSet: function() {
      // 自由入力が空のとこだけでも縛る
      return !!this.rateScore;
    }
  },
  methods: {
    onClickSet: function() {
      var record = {
        result:    this.result|0,
        missmatch: this.missmatch|0,
        tagmatch:  this.tagmatch|0,
        rule:      this.rule|0,
        stage:     this[this.chosenStage]|0,
        rate:      (this.rateRank|0) + (this.rateScore|0)
      };
      RecordModel.setRecord(record);
      // 最後に記録したウデマエを次回のデフォルトに
      UserModel.set('lastRank', this.rateRank);
      // 通算バトル数も更新
      UserModel.updateTotalIdx();
      // ベストウデマエも更新
      UserModel.updateBestRate(record.rate);

      this._cleanUpInput();
      this._showReaction();
    },
    _cleanUpInput: function() {
      // input[number]なのでPCはむしろ消さないで欲しい
      if (Util.isMobile()) {
        this.rateScore = '';
      }
      this.missmatch = false;
    },
    _showReaction: function() {
      var that = this;
      this.showSetReaction = true;
      this._timer = setTimeout(function() {
        that.showSetReaction = false;
      }, 1000);
    }
  }
};
