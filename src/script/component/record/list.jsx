const React = require('react');

class List extends React.Component {
  render() {
    const { records, } = this.props;

    return (
      <ul>
        {records.map((item, idx) => {
          return (
            <li key={idx}>
              {item.rule}
            </li>
          );
        })}
      </ul>
    );
  }
}

module.exports = List;
