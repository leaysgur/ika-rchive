'use strict';
var Const = require('../const');
var Util  = require('../util');
var RecordModel = require('../model/record-model').getInstance();
var UserModel   = require('../model/user-model').getInstance();

module.exports = {
  el: '#js-view-user',
  data: {
    records: RecordModel.data,

    bestRate:    null,
    totalIdx:    null,

    winRate:     null,
    winRateTag:  null,
    winRateFree: null,
    missmatch:   null,
    winStreak:   null,
    loseStreak:  null,
    koWinRate:   null,
    koLoseRate:  null,
    goodRule:    null,
    badRule:     null,
    goodStage:   null,
    badStage:    null,

    detailByRuleAndStage: [
      {
        name: 'エリア',
        detail: [
          { name: 'すてーじ1', winRate: 30 },
          { name: 'すてーじ2', winRate: 50 },
        ]
      },
      {
        name: 'ヤグラ',
        detail: [
          { name: 'すてーじ1', winRate: 30 },
          { name: 'すてーじ2', winRate: 50 },
        ]
      }
    ],

    canTweet:    false,
    tweetUrl:    ''
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
      this.winRate     = userData.winRate;
      this.winRateTag  = userData.winRateTag;
      this.winRateFree = userData.winRateFree;
      this.missmatch   = userData.missmatch;
      this.winStreak   = userData.winStreak;
      this.loseStreak  = userData.loseStreak;
      this.koWinRate   = userData.koWinRate;
      this.koLoseRate  = userData.koLoseRate;
      this.goodRule    = userData.goodRule;
      this.badRule     = userData.badRule;
      this.goodStage   = userData.goodStage;
      this.badStage    = userData.badStage;
      // 保存しとかないとTweet文言のトコでエラーになる・・
      UserModel.set(userData);

      // これは恒久的なもの
      this.bestRate   = Util.getRateStr(UserModel.get('bestRate')|0);
      this.totalIdx   = UserModel.get('totalIdx')|0;

      this._updateView();
    },
    _updateView: function() {
      this.canTweet = !!RecordModel.getLatestRecord();
      this.tweetUrl = this._getTweetText();
    },
    _getTweetText: function() {
      var url  = 'http://twitter.com/share?text=';
      var text = '';
      var latestRecord = RecordModel.getLatestRecord();

      if (!latestRecord) { return ''; }

      text += 'ウデマエが';
      text += Util.getRateStr(latestRecord.rate);
      text += 'になったぞ！';
      text += '最近の勝率は';
      text += UserModel.get('winRate');
      text += '%だ！\n';
      if (!!UserModel.get('goodRule')) {
        text += 'ガチ';
        text += UserModel.get('goodRule');
        text += 'と、';
        text += UserModel.get('goodStage');
        text += 'が得意だ！';
      }
      if (!!UserModel.get('badRule')) {
        text += 'ただしガチ';
        text += UserModel.get('badRule');
        text += 'と';
        text += UserModel.get('badStage');
        text += 'は苦手らしい。';
      }
      text += '\n #ウデマエアーカイブ';

      return url + encodeURIComponent(text);
    },
    _toUserData: function(records) {
      var recordsLen = records.length;
      var winStreakCount  = 0;
      var loseStreakCount = 0;
      var longestWinStreakCount  = 0;
      var longestLoseStreakCount = 0;
      var missmatchCount = 0;
      var winCount  = 0;
      var loseCount = 0;
      var koWinCount  = 0;
      var koLoseCount = 0;
      var tagWinCount   = 0;
      var tagRecordsLen = 0;
      var stageStat = {};
      var ruleStat  = {};

      // このループで用意できるものは全て用意する
      records.forEach(function(item) {
        // マッチングがクソなやつも簡単
        if (item.missmatch) { missmatchCount++; }

        // タッグマッチの数
        if (item.tagmatch) { tagRecordsLen++; }

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
          if (item.tagmatch) { tagWinCount++; }

          stageStat[item.stage].w++;
          ruleStat[item.rule].w++;

          winStreakCount++;
          loseStreakCount = 0;
        }
        // 負けた
        else {
          loseCount++;

          stageStat[item.stage].l++;
          ruleStat[item.rule].l++;

          loseStreakCount++;
          winStreakCount = 0;
        }

        // 連勝と連敗を記録
        longestLoseStreakCount = longestLoseStreakCount < loseStreakCount ? loseStreakCount : longestLoseStreakCount;
        longestWinStreakCount  = longestWinStreakCount  < winStreakCount  ? winStreakCount  : longestWinStreakCount;
        // KO勝ちとKO負け
        if (item.result === 3) { koWinCount++; }
        if (item.result === 4) { koLoseCount++; }
      });

      // 以下、各ステージと各ルールにおいて、
      // 勝率の最高と最低をそれぞれ出す
      // 単純に回数で得手不得手はわからないのでこうする
      var stageStatResult = this._getGoodAndBadStage(stageStat);
      var ruleStatResult  = this._getGoodAndBadRule(ruleStat);

      return {
        winRate:     Util.percentage(winCount, recordsLen),
        winRateTag:  Util.percentage(tagWinCount, tagRecordsLen),
        // 全体からタッグ分をひけば、野良の分がわかる
        winRateFree: Util.percentage(winCount - tagWinCount, recordsLen - tagRecordsLen),
        koWinRate:   Util.percentage(koWinCount, recordsLen),
        koLoseRate:  Util.percentage(koLoseCount, recordsLen),
        missmatch:   Util.percentage(missmatchCount, loseCount),
        goodStage:   stageStatResult.good,
        badStage:    stageStatResult.bad,
        goodRule:    ruleStatResult.good,
        badRule:     ruleStatResult.bad,
        winStreak:   longestWinStreakCount,
        loseStreak:  longestLoseStreakCount
      };
    },
    _getGoodAndBadStage: function(stageStat) {
      var goodStage = 0,
          goodStageName = '';
      var badStage = 0,
          badStageName = '';
        var matchCount = 0,
            winRate    = 0,
            loseRate   = 0,
            stage,
            key;

      for (key in stageStat) {
        stage = stageStat[key];
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

      return {
        good: goodStageName,
        bad:  badStageName
      };
    },
    _getGoodAndBadRule: function(ruleStat) {
        var goodRule = 0,
            goodRuleName = '';
        var badRule = 0,
            badRuleName = '';
        var matchCount = 0,
            winRate    = 0,
            loseRate   = 0,
            rule,
            key;

        for (key in ruleStat) {
          rule = ruleStat[key];
          matchCount = rule.w + rule.l;
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
          good: goodRuleName,
          bad:  badRuleName
        };
      }
  }
};
