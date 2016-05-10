const React = require('react');

const RecordModel = require('../model/record').getInstance();

const Chart = require('../component/graph/chart.jsx');

class GraphPage extends React.Component {
  constructor() {
    super();

    this.state = {
      records: RecordModel.get('items')
    };
  }

  render() {
    const { route } = this.props;
    const { records } = this.state;

    return (
      <div className={`view-${route.path}`}>
        <Chart records={records} />
      </div>
    );
  }
}

module.exports = GraphPage;
