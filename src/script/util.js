// @flow
const Chart = require('chart.js');

const Const = require('./const');
const gSizeW = Const.GRAPH_SIZE_TO_SCREEN.W;
const gSizeH = Const.GRAPH_SIZE_TO_SCREEN.H;

module.exports = {
  reload: (): void => {
    setTimeout(() => { location.replace(location.origin); });
  },

  isMobile: (): boolean => {
    return 'ontouchstart' in document;
  },

  getChartClass: () => {
    Chart.defaults.global.defaultFontColor = '#fff';
    Chart.defaults.global.responsive = false;
    Chart.defaults.global.events = ['mousemove', 'touchstart'];
    Chart.defaults.global.legend.display = false;

    return Chart;
  },

  getCanvasSize: (): { w: number; h: number; } => {
    const h = window.innerHeight;
    const w = window.innerWidth;

    const longSide  = h > w ? h : w;
    const shortSide = h > w ? w : h;

    return {
      w: ((longSide  * gSizeW)|0),
      h: ((shortSide * gSizeH)|0)
    };
  },

  formatDate: (time: string): string => {
    if (!time) { return ''; }
    let date = new Date(time);
    let YYYY = date.getFullYear();
    let MM   = ('0' + (date.getMonth() + 1)).slice(-2);
    let DD   = ('0' + date.getDate()).slice(-2);
    let hh   = ('0' + date.getHours()).slice(-2);
    let mm   = ('0' + date.getMinutes()).slice(-2);

    return `${YYYY}/${MM}/${DD} ${hh}:${mm}`;
  },

  getRateStr: (_val: string): string => {
    const val:number = parseInt(_val, 10);

    let rate = val % 100;
    let wait = val - rate;

    let label = '';
    for (let k in Const.RATE_TABLE) {
      if (wait === Const.RATE_TABLE[k]) {
        label = k;
        break;
      }
    }

    // 現時点で最高のS+99より上の範囲を見る必要が出てくるとコレ
    if (label.length === 0) {
      // label = Const.MAX_RATE_STR;
      // rate  = Const.MAX_RATE_INPUT;
      // これで S+99 って出せるけど、グラフ的にしっくりこない
      // なぜなら範囲が広すぎるとこれが何個も出るからである
      return '';
    }

    return label + rate;
  },

  getRankAndScore: (_rate: string): { rateRank: number; rateScore: number; } => {
    const rate: number = parseInt(_rate, 10);
    const rateRank = ((rate / 100)|0) * 100;
    return {
      rateRank:  rateRank,
      rateScore: rate - rateRank
    };
  },

  isValidRate: (score: number): boolean => {
    let min = Const.RATE_TABLE[Const.MIN_RATE_STR] + Const.MIN_RATE_INPUT;
    let max = Const.RATE_TABLE[Const.MAX_RATE_STR] + Const.MAX_RATE_INPUT;

    return min <= score && score <= max;
  },

  percentage: (c: number, p: number): string => {
    if (c === 0 || p === 0) { return '0'; }
    return ((c / p) * 100).toFixed(2);
  },

  // 値の入力欄のチェック
  canInput: (rateScoreStr: string): boolean => {
    // 自由入力が空のとこだけでも縛る
    if (rateScoreStr.length === 0) {
      return false;
    }
    // 0 - 99以外の値は弾く
    let score = parseInt(rateScoreStr, 10);
    if (score < Const.MIN_RATE_INPUT || Const.MAX_RATE_INPUT < score) {
      return false;
    }

    return true;
  },

  isDisconnected: (_result: string): boolean => {
    const result: number = parseInt(result, 10);
    return result === Const.RESULT_STR.DISCONNECTED;
  },

  isWin: (_result: string): boolean => {
    const result: number = parseInt(result, 10);

    if (result === Const.RESULT_STR.WIN ||
        result === Const.RESULT_STR.KO_WIN) {
      return true;
    }
    return false;
  },

  getRecentRateGap: (latestScore: number, lastScore: number): { ratePfx: string; rateGap: number; } => {
    const gap = latestScore - lastScore;
    const ret = {
      ratePfx: '',
      rateGap: Math.abs(gap)
    };

    switch (true) {
    case gap === 0:
      ret.ratePfx = '±';
      break;
    case gap > 0:
      ret.ratePfx = '+';
      break;
    case gap < 0:
      ret.ratePfx = '-';
      break;
    default:
    }

    return ret;
  },

  getKDRatioStr: (val: number): string => {
    const vArr = (''+val).split('.');
    if (vArr.length === 1) {
      return ('0' + val).slice(-2) + '.0';
    }
    return ('0' + vArr[0]).slice(-2) + '.' + vArr[1];
  },

  calcKDRatio({ kill, death }: { kill: number; death: number; }): number {
    let ratio = 0;
    // 0k0dは1とする
    if (kill === 0 && death === 0) {
      ratio = 1;
    }
    // Nk0dはそのまま
    else if (death === 0) {
      ratio = ((kill * 10)|0) / 10;
    }
    else {
      ratio = ((kill / death * 10)|0) / 10;
    }

    return ratio;
  },

  getTweetUrl(rateStr: string, state: Object): string {
    const text = [
      `ウデマエが${rateStr}になったぞ！最近の勝率は${state.winRate}%！`,
      `${state.totalIdx}戦のキロクで、いまの適正ウデマエは${state.avgRate}だ！`,
      `#ウデマエアーカイブ`,
    ].join('\n');

    return Const.TWITTER_URL + encodeURIComponent(text);
  }
};
