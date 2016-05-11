const React = require('react');

const RecordModel = require('../model/record').getInstance();

class RecordPage extends React.Component {
  constructor() {
    super();

    this.state = {
      records: RecordModel.get('items')
    };
  }

  render() {
    const {
      route,
      children,
    } = this.props;
    const { records } = this.state;

    return (
      <div className={`view-${route.path}`}>
        {React.cloneElement(children, {
          records,
        })}
      </div>
    );
  }
}

module.exports = RecordPage;
