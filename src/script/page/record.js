const React = require('react');

const RecordModel = require('../model/record').getInstance();

const Graph = require('../component/record/graph.jsx');

class RecordPage extends React.Component {
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
        <Graph records={records} />
      </div>
    );
  }
}

module.exports = RecordPage;
