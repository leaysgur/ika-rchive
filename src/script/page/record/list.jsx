const React = require('react');
const assign = require('object-assign');
const { Link } = require('react-router');

const RecordModel = require('../../model/record').getInstance();
const UserModel   = require('../../model/user').getInstance();

const List     = require('../../component/record/list.jsx');
const ModPopup = require('../../component/record/mod-popup.jsx');

function toListData(records) {
  return records.slice().reverse();
}

class ListPage extends React.Component {
  constructor() {
    super();

    this.state = {
      records: toListData(RecordModel.get('items')),
      modItem: null,
      modIdx:  null,
    };

    this.modifyRecord = this.modifyRecord.bind(this);
    this.onModify     = this.onModify.bind(this);
    this.removeRecord = this.removeRecord.bind(this);
  }

  modifyRecord(ev, item, idx) {
    ev.preventDefault();
    ev.stopPropagation();

    if (this.state.modItem) { return; }

    console.log(item, idx);
    this.setState({
      modItem: assign({}, item),
      modIdx:  idx,
    });
  }

  onModify(record) {
    if (record) {
      RecordModel.updateRecord(this.state.modIdx, record);
      UserModel.updateBestRate(record.rate);
    }
    this.setState({
      records: toListData(RecordModel.get('items')),
      modItem: null,
      modIdx:  null
    });
  }

  removeRecord(ev, idx) {
    ev.preventDefault();
    ev.stopPropagation();

    if (this.state.modItem) { return; }

    RecordModel.removeRecord(idx);
    this.setState({
      records: toListData(RecordModel.get('items'))
    });
  }

  render() {
    const { route, } = this.props;
    const {
      records,
      modItem,
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

        {modItem
          ? <ModPopup
              modItem={modItem}
              onModify={this.onModify}
            />
          : null
        }

        <List
          records={records}
          modifyRecord={this.modifyRecord}
          removeRecord={this.removeRecord}
        />
      </div>
    );
  }
}

module.exports = ListPage;
