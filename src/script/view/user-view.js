'use strict';
var Vue   = require('vue');
var Const = require('../const');
var Util  = require('../util');
var RecordModel = require('../model/record-model').getInstance();

module.exports = Vue.extend({
  el: function() { return '#js-view-user'; },
  data: function() {
    return {
      records: RecordModel.data,

      bestRate:   null,
      winRate:    null,
      koWinRate:  null,
      koLoseRate: null,
      goodRule:   null,
      badRule:    null,
      goodStage:  null,
      badStage:   null
    };
  },
  events: {
    'hook:created': function() { this._syncUserData(); }
  },
  watch: {
    records: function() { this._syncUserData(); }
  },
  methods: {
    _syncUserData: function() {
      var userData = this._toUserData(this.records);
      this.bestRate   = userData.bestRate;
      this.winRate    = userData.winRate;
      this.koWinRate  = userData.koWinRate;
      this.koLoseRate = userData.koLoseRate;
      this.goodRule   = userData.goodRule;
      this.badRule    = userData.badRule;
      this.goodStage  = userData.goodStage;
      this.badStage   = userData.badStage;
    },
    _toUserData: function(records) {
      var recordsLen = records.length;
      var bestRate = 0;
      var winCount = 0;
      var koWinCount  = 0;
      var koLoseCount = 0;
      var stageStat = {};
      var ruleStat  = {};

      // このループで用意できるものは全て用意する
      records.forEach(function(item) {
        // 勝率は計算するだけなので簡単
        bestRate = (item.rate > bestRate) ? item.rate : bestRate;

        // ステージ別の勝ち負け
        if (item.stage in stageStat === false) {
          stageStat[item.stage] = { w:0, l: 0 };
        }
        // ルール別の勝ち負け
        if (item.rule in ruleStat === false) {
          ruleStat[item.rule] = { w:0, l: 0 };
        }

        // 勝った
        if (item.result % 2)   {
          winCount++;
          stageStat[item.stage].w++;
          ruleStat[item.rule].w++;
        }
        // 負けた
        else {
          stageStat[item.stage].l++;
          ruleStat[item.rule].l++;
        }
        // KO勝ちとKO負け
        if (item.result === 3) { koWinCount++; }
        if (item.result === 4) { koLoseCount++; }
      });

      // 以下、各ステージと各ルールにおいて、
      // 勝率の最高と最低をそれぞれ出す
      // 単純に回数で得手不得手はわからないのでこうする
      var key,
          matchCount,
          winRate,
          loseRate;

      // 勝ってるステージと負けてるステージ
      var goodStage = 0,
          goodStageName = '';
      var badStage = 0,
          badStageName = '';
      for (key in stageStat) {
        var stage = stageStat[key];
        matchCount  = stage.w + stage.l;
        winRate  = (stage.w / matchCount) * 100;
        loseRate = (stage.l / matchCount) * 100;

        if (goodStage < winRate) {
          goodStage = winRate;
          goodStageName = Const.STAGE[key];
        }
        if (badStage < loseRate) {
          badStage = loseRate;
          badStageName = Const.STAGE[key];
        }
      }

      // 勝ってるルールと負けてるルール
      var goodRule = 0,
          goodRuleName = '';
      var badRule = 0,
          badRuleName = '';
      for (key in ruleStat) {
        var rule = ruleStat[key];
        matchCount  = rule.w + rule.l;
        winRate  = (rule.w / matchCount) * 100;
        loseRate = (rule.l / matchCount) * 100;

        if (goodRule < winRate) {
          goodRule = winRate;
          goodRuleName = Const.RULE[key];
        }
        if (badRule < loseRate) {
          badRule = loseRate;
          badRuleName = Const.RULE[key];
        }
      }

      return {
        bestRate:   Util.getRateStr(bestRate),
        winRate:    (winCount / recordsLen) * 100,
        koWinRate:  (koWinCount / recordsLen) * 100,
        koLoseRate: (koLoseCount / recordsLen) * 100,
        goodStage:  goodStageName,
        badStage:   badStageName,
        goodRule:   goodRuleName,
        badRule:    badRuleName,
      };
    }
  }
});
