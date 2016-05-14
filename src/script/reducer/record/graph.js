const Util = require('../../util');
const {
  RULE,
  RECORD_LIMIT,
  RULE_COLOR,
  RATE_SCALE_GAP,
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
    uScaleMax:        0,
    uScaleMin:        0,
    // キルレ
    kdData:           [],
    kdTooltip:        [],
    kdScaleMax:       0,
    kdScaleMin:       0,
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
    if (!('kill' in item && 'death' in item)) {
      ratio = null;
    }
    // 0k0dは1とする
    else if (item.kill === 0 && item.death === 0) {
      ratio = 1;
    }
    // Nk0dはそのまま
    else if (item.death === 0) {
      ratio = ((item.kill * 10)|0) / 10;
    }
    else {
      ratio = ((item.kill / item.death * 10)|0) / 10;
    }
    ret.kdData.push(ratio);
    ret.kdTooltip.push(`${item.kill}k / ${item.death}d`);
  }

  // ループ後に欲しいやつ
  ret.uScaleMax = _getUdemaeScaleMax(ret.uData);
  ret.uScaleMin = _getUdemaeScaleMin(ret.uData);
  ret.kdScaleMax = Math.max.apply(null, ret.kdData);
  ret.kdScaleMin = 0;

  return ret;
};

function _getUdemaeScaleMax(data) {
  data = data.filter(Boolean);
  return Math.ceil(Math.max.apply(null, data) / 10) * 10 + RATE_SCALE_GAP;
}

function _getUdemaeScaleMin(data) {
  data = data.filter(Boolean);
  return Math.max(
    0,
    Math.floor(Math.min.apply(null, data) / 10) * 10 - RATE_SCALE_GAP
  );
}
