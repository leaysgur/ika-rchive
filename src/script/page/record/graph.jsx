const React = require('react');
const { Link } = require('react-router');

const Graph = require('../../component/record/graph.jsx');

class GraphPage extends React.Component {
  render() {
    const {
      route,
      records,
    } = this.props;

    return (
      <div className={`view-${route.path}`}>
        <Graph records={records} />
        <Link to="record/list" activeClassName="is-active">ソノタ</Link>
      </div>
    );
  }
}

module.exports = GraphPage;
