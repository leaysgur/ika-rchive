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
    labels:          [],
    data:            [],
    tooltip:         [],
    backgroundColor: [],
  };

  if (records.length === 0) { return ret; }

  // 1ループで必要なデータを集める
  // グラフの体裁を合わせるため、実データより大枠を優先
  for (let i = 0, l = RECORD_LIMIT; i < l; i++) {
    let cnt = i + 1;
    let item = records[i] || {};
    ret.labels.push(cnt % LABEL_UNIT === 0 ? cnt : '');
    ret.data.push(item.rate || null);
    ret.tooltip.push(`${RULE[item.rule]}: ${Util.getRateStr(item.rate)}`);
    ret.backgroundColor.push(RULE_COLOR[item.rule]);
  }

  return ret;
};
