const React = require('react');
const { Link } = require('react-router');

const UserModel   = require('../../model/user').getInstance();
const RecordModel = require('../../model/record').getInstance();

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
  constructor() {
    super();

    this.state = {
      records:  RecordModel.get('items'),
      totalIdx: UserModel.get('totalIdx')|0,
    };

    this.removeRecord = this.removeRecord.bind(this);
  }

  removeRecord(ev, idx) {
    ev.preventDefault();
    ev.stopPropagation();
    RecordModel.remove(idx);
    this.setState({ records: RecordModel.get('items') });
  }

  render() {
    const { route, } = this.props;
    const {
      records,
      totalIdx,
    } = this.state;

    return (
      <div className={`view-${route.path}`}>
        <Link to="record" activeClassName="is-active">グラフでみる</Link>
        <List
          records={toListData(records, totalIdx)}
          removeRecord={this.removeRecord}
        />
      </div>
    );
  }
}

module.exports = ListPage;
