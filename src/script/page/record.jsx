const React = require('react');

const UserModel   = require('../model/user').getInstance();
const RecordModel = require('../model/record').getInstance();

class RecordPage extends React.Component {
  constructor() {
    super();

    this.state = {
      records:  RecordModel.get('items'),
      totalIdx: UserModel.get('totalIdx')|0,
    };
  }

  render() {
    const {
      route,
      children,
    } = this.props;
    const {
      records,
      totalIdx,
    } = this.state;

    return (
      <div className={`view-${route.path}`}>
        {React.cloneElement(children, {
          records,
          totalIdx,
        })}
      </div>
    );
  }
}

module.exports = RecordPage;
