const React = require('react');
const assign = require('object-assign');

const RecordModel = require('../../model/record').getInstance();
const UserModel   = require('../../model/user').getInstance();

const listReducer = require('../../reducer/record/list');

const List     = require('../../component/record/list.jsx');
const Switcher = require('../../component/record/switcher.jsx');
const ModPopup = require('../../component/record/mod-popup.jsx');

class ListPage extends React.Component {
  constructor() {
    super();

    this.state = {
      records: listReducer(RecordModel.get('items')),
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
      records: listReducer(RecordModel.get('items')),
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
      records: listReducer(RecordModel.get('items'))
    });
  }

  render() {
    const {
      records,
      modItem,
    } = this.state;

    if (records.length === 0) {
      return (
        <div className="graph-cover">
          <p className="wrap">まだデータが<span className="ft-ika">トウロク</span>されてないぞ！</p>
        </div>
      );
    }

    return (
      <div>
        <Switcher isList={true} isGraph={false} />

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

        <Switcher isList={true} isGraph={false} />
      </div>
    );
  }
}

module.exports = ListPage;
