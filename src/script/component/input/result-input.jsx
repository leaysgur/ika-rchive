const React = require('react');

const { RESULT, } = require('../../const');

const ResultInput = ({
  result,
  onChange,
}) => {
  return (
    <div>
      {Object.keys(RESULT).map((key, idx) => {
        return (
          <label key={idx}>
            <input
              name="result" type="radio"
              value={key} checked={result === key}
              onChange={(ev) => { onChange('result', ev.target.value); }}
            />{RESULT[key]}
          </label>
        );
      })}
    </div>
  );
};

ResultInput.propTypes = {
  result:   PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

module.exports = ResultInput;
