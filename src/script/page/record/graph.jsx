const React = require('react');

const RecordModel = require('../../model/record').getInstance();

const graphReducer = require('../../reducer/record/graph');

const Switcher    = require('../../component/record/switcher.jsx');
const UdemaeGraph = require('../../component/record/udemae-graph.jsx');

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
      uData,
      uBackgroundColor,
      uTooltip,
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
          data={uData}
          backgroundColor={uBackgroundColor}
          labels={labels}
          tooltip={uTooltip}
        />
      </div>
    );
  }
}

module.exports = GraphPage;
