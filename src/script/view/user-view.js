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
      winStreak:  null,
      loseStreak: null,
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
      this.winStreak  = userData.winStreak;
      this.loseStreak = userData.loseStreak;
      this.koWinRate  = userData.koWinRate;
      this.koLoseRate = userData.koLoseRate;
      this.goodRule   = userData.goodRule;
      this.badRule    = userData.badRule;
      this.goodStage  = userData.goodStage;
      this.badStage   = userData.badStage;
    },
    _toUserData: function(records) {
      var recordsLen = records.length;
      var winStreakCount = 0;
      var loseStreakCount = 0;
      var longestWinStreakCount = 0;
      var longestLoseStreakCount = 0;
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

          winStreakCount++;
          loseStreakCount = 0;
        }
        // 負けた
        else {
          stageStat[item.stage].l++;
          ruleStat[item.rule].l++;

          loseStreakCount++;
          winStreakCount = 0;
        }

        // 連勝と連敗を記録
        longestLoseStreakCount = longestLoseStreakCount < loseStreakCount ? loseStreakCount : longestLoseStreakCount;
        longestWinStreakCount = longestWinStreakCount < winStreakCount ? winStreakCount : longestWinStreakCount;
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
        winRate:    Util.percentage(winCount, recordsLen),
        koWinRate:  Util.percentage(koWinCount, recordsLen),
        koLoseRate: Util.percentage(koLoseCount, recordsLen),
        goodStage:  goodStageName,
        badStage:   badStageName,
        goodRule:   goodRuleName,
        badRule:    badRuleName,
        winStreak:  longestWinStreakCount,
        loseStreak: longestLoseStreakCount
      };
    }
  }
});
