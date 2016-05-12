const React = require('react');
const { Link } = require('react-router');

const RecordModel = require('../../model/record').getInstance();

const {
  RECORD_LIMIT,
  RULE_COLOR,
} = require('../../const');
const Util = require('../../util');
const isMobile = Util.isMobile();

const Graph = require('../../component/record/graph.jsx');

// TODO: util/toGraphState?Props?ってなるので別のなんかに
function toGraphData(records) {
  const ret = {
    labels:          [],
    data:            [],
    backgroundColor: []
  };

  if (records.length === 0) { return ret; }

  // 1ループで必要なデータを集める
  // グラフの体裁を合わせるため、実データより大枠を優先
  for (let i = 0, l = RECORD_LIMIT; i < l; i++) {
    let cnt = i + 1;
    let { rate, rule } = records[i] || {};
    if (isMobile) {
      ret.labels.push(cnt % 10 === 0 ? cnt : '');
    } else {
      ret.labels.push(cnt);
    }
    ret.data.push(rate || null);
    ret.backgroundColor.push(RULE_COLOR[rule]);
  }

  return ret;
}

class GraphPage extends React.Component {
  constructor() {
    super();

    this.state = toGraphData(RecordModel.get('items'));
  }

  render() {
    const { route, } = this.props;
    const {
      data,
      backgroundColor,
      labels,
    } = this.state;

    if (data.length === 0) {
      return (
        <div className={`view-${route.path}`}>
          <div className="graph-cover">
            <p className="wrap">まだデータが<span className="ft-ika">トウロク</span>されてないぞ！</p>
          </div>
        </div>
      );
    }

    return (
      <div className={`view-${route.path}`}>
        <Link to="record/list">リストでみる</Link>
        <Graph {...{ data, backgroundColor, labels, }} />
      </div>
    );
  }
}

module.exports = GraphPage;
