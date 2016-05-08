const React = require('react'); // eslint-disable-line no-unused-vars

const ResultInput = ({
  RESULT,
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

module.exports = ResultInput;
