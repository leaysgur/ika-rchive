const React = require('react');
const { Link } = require('react-router');

const RecordModel = require('../../model/record').getInstance();

const List = require('../../component/record/list.jsx');

class ListPage extends React.Component {
  constructor() {
    super();

    this.state = {
      records: [].slice.call(RecordModel.get('items'))
    };
    console.log(this.state.records[0].rule);

    this.removeRecord = this.removeRecord.bind(this);
  }

  removeRecord(ev, idx) {
    ev.preventDefault();
    ev.stopPropagation();

    RecordModel.remove(idx);
    this.setState({
      records: [].slice.call(RecordModel.get('items'))
    });
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
          records={records.reverse()}
          removeRecord={this.removeRecord}
        />
      </div>
    );
  }
}

module.exports = ListPage;
