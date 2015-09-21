'use strict';
let Const = require('../const');
let Util  = require('../util');
let RecordModel = require('../model/record-model').getInstance();
let UserModel   = require('../model/user-model').getInstance();

// Observableなのは変数
let RECORDS = RecordModel.get('items');

module.exports = {
  el: '#js-view-user',
  data: {
    records: RECORDS,

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
      let userData = this._toUserData(this.records);

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
    _getTweetText: () => {
      let latestRecord = RecordModel.getLatestRecord();

      if (!latestRecord) { return ''; }

      let rateStr = Util.getRateStr(latestRecord.rate);
      let winRate = UserModel.get('winRate');
      let text = `ウデマエが${rateStr}になったぞ！最近の勝率は${winRate}%だ！\n`;

      if (!!UserModel.get('goodRule')) {
        let rule  = UserModel.get('goodRule');
        let stage = UserModel.get('goodStage');
        text += `ガチ${rule}と${stage}が得意だ！`
      }
      if (!!UserModel.get('badRule')) {
        let rule  = UserModel.get('badRule');
        let stage = UserModel.get('badStage');
        text += `ただしガチ${rule}と${stage}は苦手らしい。`
      }
      text += '\n #ウデマエアーカイブ';

      return Const.TWITTER_URL + encodeURIComponent(text);
    },
    _toUserData: (records) => {
      let recordsLen = records.length;
      let winStreakCount  = 0;
      let loseStreakCount = 0;
      let longestWinStreakCount  = 0;
      let longestLoseStreakCount = 0;
      let missmatchCount = 0;
      let winCount  = 0;
      let loseCount = 0;
      let koWinCount  = 0;
      let koLoseCount = 0;
      let tagWinCount   = 0;
      let tagRecordsLen = 0;
      let stageStat = {};
      let ruleStat  = {};
      let winRateDetail = {
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
      let stageStatResult = this._getGoodAndBad(stageStat);
      let ruleStatResult  = this._getGoodAndBad(ruleStat);

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
    _getWinRateDetail: (winRateDetail) => {
      let key, key2, rule, stage, res, ret = [];
      for (key in winRateDetail) {
        rule = winRateDetail[key];
        res = {
          name:   Const.RULE[key],
          total:  0,
          detail: []
        };
        let total = 0;
        let win   = 0;
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
    _getGoodAndBad: (stat) => {
      let good = 0,
          goodName = '';
      let bad = 0,
          badName = '';
      let matchCount = 0,
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
