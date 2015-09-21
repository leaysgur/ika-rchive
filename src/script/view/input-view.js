'use strict';
let Const = require('../const');
let Util  = require('../util');
let RecordModel = require('../model/record-model').getInstance();
let UserModel   = require('../model/user-model').getInstance();

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
      let isWin = (this.result|0) % 2;
      return !!isWin;
    },
    canSet: function() {
      let score = this.rateScore|0;
      // 自由入力が空のとこだけでも縛る
      if (!score) {
        return false;
      }
      // 0 - 99以外の値は弾く
      if (score < Const.MIN_RATE_INPUT || Const.MAX_RATE_INPUT < score) {
        return false;
      }

      return true;
    }
  },
  methods: {
    onClickSet: function() {
      let record = {
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
      let that = this;
      this.showSetReaction = true;
      this._timer = setTimeout(function() {
        that.showSetReaction = false;
      }, 1000);
    }
  }
};
