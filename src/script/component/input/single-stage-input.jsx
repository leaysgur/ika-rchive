const React = require('react');

const { STAGE, } = require('../../const');

const SingleStageInput = ({
  stage,
  onChange,
}) => {
  return (
    <div>
      <select
        name="stage"
        value={stage}
        onChange={(ev) => { onChange('stage', ev.target.value); }}
      >
        {Object.keys(STAGE).map((key, idx) => {
          return (
            <option key={idx} value={key}>
              {STAGE[key]}
            </option>
          );
        })}
      </select>
    </div>
  );
};

SingleStageInput.propTypes = {
  stage:    PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

module.exports = SingleStageInput;
