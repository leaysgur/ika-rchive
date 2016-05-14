const React = require('react');

class RecordPage extends React.Component {
  render() {
    const {
      route,
      children,
    } = this.props;

    return (
      <div className={`view-${route.path}`}>
        {children}
      </div>
    );
  }
}

module.exports = RecordPage;
