const React = require('react');

const RecordModel = require('../../model/record').getInstance();

const graphReducer = require('../../reducer/record/graph');

const Switcher    = require('../../component/record/switcher.jsx');
const UdemaeGraph = require('../../component/record/udemae-graph.jsx');
const KDGraph     = require('../../component/record/kd-graph.jsx');

class GraphPage extends React.Component {
  constructor() {
    super();

    this.state = graphReducer(RecordModel.get('items'));
  }

  render() {
    const { route, } = this.props;
    const {
      noData,
      labels,
      uData, uBackgroundColor,
      uTooltip,
      uScaleMax, uScaleMin,
      kdData,
      kdTooltip,
      kdScaleMax, kdScaleMin,
    } = this.state;

    if (noData) {
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
        <Switcher isList={false} isGraph={true} />

        <UdemaeGraph
          labels={labels}
          data={uData}
          backgroundColor={uBackgroundColor}
          tooltip={uTooltip}
          scaleMax={uScaleMax} scaleMin={uScaleMin}
        />

        <KDGraph
          labels={labels}
          data={kdData}
          tooltip={kdTooltip}
          scaleMax={kdScaleMax} scaleMin={kdScaleMin}
        />
      </div>
    );
  }
}

module.exports = GraphPage;
