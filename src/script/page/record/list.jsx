const React = require('react');
const { Link } = require('react-router');

const List = require('../../component/record/list.jsx');

class ListPage extends React.Component {
  render() {
    const {
      route,
      records,
    } = this.props;

    return (
      <div className={`view-${route.path}`}>
        <List records={records} />
        <Link to="record" activeClassName="is-active">もどる</Link>
      </div>
    );
  }
}

module.exports = ListPage;
