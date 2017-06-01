const React = require('react');
const PropTypes = require('prop-types');

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
      /> k
      /
      <input
        name="death" type="number"
        min={0}
        value={death}
        onChange={(ev) => { onChange('death', ev.target.value); }}
      /> d
    </div>
  );
};

KDInput.propTypes = {
  kill:     PropTypes.string.isRequired,
  death:    PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

module.exports = KDInput;
