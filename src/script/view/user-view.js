'use strict';
var Const = require('../const');
var Util  = require('../util');
var RecordModel = require('../model/record-model').getInstance();
var UserModel   = require('../model/user-model').getInstance();

module.exports = {
  el: '#js-view-user',
  data: {
    records: RecordModel.data.items,

    bestRate:    null,
    totalIdx:    null,

    winRate:       null,
    winRateTag:    null,
    winRateFree:   null,
    missmatch:     null,
    winStreak:     null,
    loseStreak:    null,
    koWinRate:     null,
    koLoseRate:    null,
    goodRule:      null,
    badRule:       null,
    goodStage:     null,
    badStage:      null,
    winRateDetail: [],

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

      this.winRate       = userData.winRate;
      this.winRateTag    = userData.winRateTag;
      this.winRateFree   = userData.winRateFree;
      this.missmatch     = userData.missmatch;
      this.winStreak     = userData.winStreak;
      this.loseStreak    = userData.loseStreak;
      this.koWinRate     = userData.koWinRate;
      this.koLoseRate    = userData.koLoseRate;
      this.goodRule      = userData.goodRule;
      this.badRule       = userData.badRule;
      this.goodStage     = userData.goodStage;
      this.badStage      = userData.badStage;
      // これは配列なのでこうしないと反映されない
      while (this.winRateDetail.length) {
        this.winRateDetail.pop();
      }
      while (userData.winRateDetail.length) {
        this.winRateDetail.push(userData.winRateDetail.shift());
      }

      // 保存しとかないとTweet文言のトコでエラーになる・・
      // けど必要ないものは保存したくないので選ぶ
      UserModel.set({
        winRate:   userData.winRate,
        goodRule:  userData.goodRule,
        badRule:   userData.badRule,
        goodStage: userData.goodStage,
        badStage:  userData.badStage
      });

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
      var winRateDetail = {
        // ルール別
        // 1: {
        //   ステージ別勝利回数
        //   1: { t: 3, w: 1 }
        // }
      };

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

        // ルール x ステージの勝率を出す
        winRateDetail[item.rule] = winRateDetail[item.rule] || {};
        winRateDetail[item.rule][item.stage] = winRateDetail[item.rule][item.stage] || { w: 0, t: 0 };
        winRateDetail[item.rule][item.stage].t++;

        // 勝った
        if (item.result % 2)   {
          winCount++;
          if (item.tagmatch) { tagWinCount++; }

          stageStat[item.stage].w++;
          ruleStat[item.rule].w++;
          winRateDetail[item.rule][item.stage].w++;

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
      var stageStatResult = this._getGoodAndBad(stageStat);
      var ruleStatResult  = this._getGoodAndBad(ruleStat);

      // ルール別ステージ別の勝率
      winRateDetail = this._getWinRateDetail(winRateDetail);

      return {
        winRate:       Util.percentage(winCount, recordsLen),
        winRateTag:    Util.percentage(tagWinCount, tagRecordsLen),
        // 全体からタッグ分をひけば、野良の分がわかる
        winRateFree:   Util.percentage(winCount - tagWinCount, recordsLen - tagRecordsLen),
        koWinRate:     Util.percentage(koWinCount, recordsLen),
        koLoseRate:    Util.percentage(koLoseCount, recordsLen),
        missmatch:     Util.percentage(missmatchCount, loseCount),
        goodStage:     Const.STAGE[stageStatResult.good],
        badStage:      Const.STAGE[stageStatResult.bad],
        goodRule:      Const.RULE[ruleStatResult.good],
        badRule:       Const.RULE[ruleStatResult.bad],
        winStreak:     longestWinStreakCount,
        loseStreak:    longestLoseStreakCount,
        winRateDetail: winRateDetail
      };
    },
    _getWinRateDetail: function(winRateDetail) {
      var key, key2, rule, stage, res, ret = [];
      for (key in winRateDetail) {
        rule = winRateDetail[key];
        res = {
          name:   Const.RULE[key],
          total:  0,
          detail: []
        };
        var total = 0;
        var win   = 0;
        for (key2 in rule) {
          stage = rule[key2];
          res.detail.push({
            name:    Const.STAGE[key2],
            winRate: Util.percentage(stage.w, stage.t)
          });
          win   += stage.w;
          total += stage.t;
        }
        res.total = Util.percentage(win, total);
        ret.push(res);
      }
      return ret;
    },
    _getGoodAndBad: function(stat) {
      var good = 0,
          goodName = '';
      var bad = 0,
          badName = '';
      var matchCount = 0,
          winRate    = 0,
          loseRate   = 0,
          item,
          key;

      for (key in stat) {
        item = stat[key];
        matchCount  = item.w + item.l;
        winRate  = (item.w / matchCount) * 100;
        loseRate = (item.l / matchCount) * 100;

        if (good < winRate) {
          good = winRate;
          goodName = key;
        }
        if (bad < loseRate) {
          bad = loseRate;
          badName = key;
        }
      }

      return {
        good: goodName,
        bad:  badName
      };
    }
  }
};
