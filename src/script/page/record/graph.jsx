const React = require('react');
const { Link } = require('react-router');

const RecordModel = require('../../model/record').getInstance();

const Graph = require('../../component/record/graph.jsx');

class GraphPage extends React.Component {
  constructor() {
    super();

    this.state = {
      records: RecordModel.get('items'),
    };
  }

  render() {
    const { route, } = this.props;
    const {
      records,
    } = this.state;

    return (
      <div className={`view-${route.path}`}>
        <Link to="record/list">リストでみる</Link>
        <Graph records={records} />
      </div>
    );
  }
}

module.exports = GraphPage;
