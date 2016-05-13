const React = require('react');

const KDInput = ({
  kill, death,
  onChange,
}) => {
  return (
    <div>
      <input
        name="kill" type="number"
        min={0}
        value={kill}
        onChange={(ev) => { onChange('kill', ev.target.value); }}
      /> キル
      /
      <input
        name="death" type="number"
        min={0}
        value={death}
        onChange={(ev) => { onChange('death', ev.target.value); }}
      /> デス
    </div>
  );
};

KDInput.propTypes = {
  kill:     React.PropTypes.string.isRequired,
  death:    React.PropTypes.string.isRequired,
  onChange: React.PropTypes.func.isRequired,
};

module.exports = KDInput;
