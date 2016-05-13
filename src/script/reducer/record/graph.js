const Util = require('../../util');
const {
  RULE,
  RECORD_LIMIT,
  RULE_COLOR,
  LABEL_UNIT_PC,
  LABEL_UNIT_MOBILE,
} = require('../../const');
const LABEL_UNIT = Util.isMobile() ? LABEL_UNIT_MOBILE : LABEL_UNIT_PC;

module.exports = (records) => {
  const ret = {
    // 共通
    noData:           false,
    labels:           [],
    // ウデマエ
    uData:            [],
    uTooltip:         [],
    uBackgroundColor: [],
    // キルレ
    kdData:           [],
    kdTooltip:        [],
  };

  if (records.length === 0) {
    ret.noData = true;
    return ret;
  }

  // 1ループで必要なデータを集める
  // グラフの体裁を合わせるため、実データより大枠を優先
  for (let i = 0, l = RECORD_LIMIT; i < l; i++) {
    const cnt = i + 1;
    const item = records[i] || {};

    ret.labels.push(cnt % LABEL_UNIT === 0 ? cnt : '');

    ret.uData.push(item.rate || null);
    ret.uTooltip.push(`${RULE[item.rule]}: ${Util.getRateStr(item.rate)}`);
    ret.uBackgroundColor.push(RULE_COLOR[item.rule]);

    // 0になるとInfinityになっちゃうので注意
    let ratio;
    // そもそも入力してない
    if (typeof item.kill !== 'number' && typeof item.death !== 'number') {
      ratio = null;
    }
    // 0k0dは1とする
    else if (item.kill === 0 && item.death === 0) {
      ratio = 1;
    }
    else {
      ratio = (item.death === 0)
        ? ((item.kill * 10)|0) / 10
        : ((item.kill / item.death * 10)|0) / 10;
    }
    ret.kdData.push(ratio);
    ret.kdTooltip.push(`${item.kill}k / ${item.death}d`);
  }

  return ret;
};
