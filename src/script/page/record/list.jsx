const React = require('react');
const { Link } = require('react-router');

const List = require('../../component/record/list.jsx');

// TODO: util/toListState?Props?ってなるので別のなんかに
function toListData(records, totalIdx) {
  let startIdx = totalIdx - records.length;
  return records.map((item, idx) => {
    item.idx      = idx;
    item.totalIdx = startIdx + idx + 1;
    return item;
  }).reverse();
}

class ListPage extends React.Component {
  render() {
    const {
      route,
      records,
      totalIdx,
    } = this.props;

    return (
      <div className={`view-${route.path}`}>
        <List records={toListData(records, totalIdx)} />
        <Link to="record" activeClassName="is-active">グラフでみる</Link>
      </div>
    );
  }

}

module.exports = ListPage;
