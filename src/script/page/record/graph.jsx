const React = require('react');
const { Link } = require('react-router');

const RecordModel = require('../../model/record').getInstance();

const {
  RULE_COLOR,
} = require('../../const');


const Graph = require('../../component/record/graph.jsx');

// TODO: util/toGraphState?Props?ってなるので別のなんかに
function toGraphData(records) {
  const ret = {
    data:            [],
    backgroundColor: []
  };

  // 1ループで必要なデータを集める
  records.forEach((item) => {
    ret.data.push(item.rate);
    ret.backgroundColor.push(RULE_COLOR[item.rule]);
  });

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
        <Graph {...{ data, backgroundColor, }} />
      </div>
    );
  }
}

module.exports = GraphPage;
