const assign = require('object-assign');
const Util = require('./');
const Const = require('../const');

module.exports = (records, bestRate, totalIdx) => {
  return assign({
    bestRate: Util.getRateStr(bestRate),
    totalIdx: totalIdx|0,
  }, _getUserStat(records));
};

function _getUserStat(records) {
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
    if (Util.isWin(item.result))   {
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
  let stageStatResult = _getGoodAndBad(stageStat);
  let ruleStatResult  = _getGoodAndBad(ruleStat);

  // ルール別ステージ別の勝率
  winRateDetail = _getWinRateDetail(winRateDetail);

  return {
    winRate:       Util.percentage(winCount, recordsLen),
    winRateTag:    Util.percentage(tagWinCount, tagRecordsLen),
    // 全体からタッグ分をひけば、野良の分がわかる
    winRateFree:   Util.percentage(winCount - tagWinCount, recordsLen - tagRecordsLen),
    koWinRate:     Util.percentage(koWinCount, recordsLen),
    koLoseRate:    Util.percentage(koLoseCount, recordsLen),
    missmatch:     Util.percentage(missmatchCount, recordsLen),
    goodStage:     Const.STAGE[stageStatResult.good],
    badStage:      Const.STAGE[stageStatResult.bad],
    goodRule:      Const.RULE[ruleStatResult.good],
    badRule:       Const.RULE[ruleStatResult.bad],
    winStreak:     longestWinStreakCount,
    loseStreak:    longestLoseStreakCount,
    winRateDetail: winRateDetail
  };
}

function _getGoodAndBad(stat) {
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

function _getWinRateDetail(winRateDetail) {
  let key, key2, rule, stage, res, ret = [];
  for (key in winRateDetail) {
    rule = winRateDetail[key];
    res = {
      name:   Const.RULE[key],
      total:  0,
      count:  0,
      detail: []
    };

    let total = 0;
    let win   = 0;
    for (key2 in rule) {
      stage = rule[key2];
      res.detail.push({
        name:    Const.STAGE[key2],
        count:   stage.t,
        winRate: Util.percentage(stage.w, stage.t)
      });
      win   += stage.w;
      total += stage.t;
    }

    // 勝率のいい順にする
    res.detail.sort((a, b) => { return (a.winRate|0) > (b.winRate|0) ? -1 : 1; });
    res.total = Util.percentage(win, total);
    res.count = total;

    ret.push(res);
  }

  return ret;
}
