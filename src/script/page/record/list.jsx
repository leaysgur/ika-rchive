const React = require('react');
const { Link } = require('react-router');

const RecordModel = require('../../model/record').getInstance();

const List = require('../../component/record/list.jsx');

// TODO: util/toListState?Props?ってなるので別のなんかに
function toListData(records) {
  return records.reverse();
}

class ListPage extends React.Component {
  constructor() {
    super();

    this.state = {
      records: toListData(RecordModel.get('items'))
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
    } = this.state;

    if (records.length === 0) {
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
        <Link to="record" activeClassName="is-active">グラフでみる</Link>
        <List
          records={records}
          removeRecord={this.removeRecord}
        />
      </div>
    );
  }
}

module.exports = ListPage;
