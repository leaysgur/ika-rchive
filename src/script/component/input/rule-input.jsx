const React = require('react'); // eslint-disable-line no-unused-vars

const RuleInput = ({
  RULE,
  rule,
  onChange,
}) => {
  return (
    <div>
      {Object.keys(RULE).map((key, idx) => {
        return (
          <label key={idx}>
            <input
              name="rule" type="radio"
              value={key} checked={rule === key}
              onChange={(ev) => { onChange('rule', ev.target.value); }}
            />{RULE[key]}
          </label>
        );
      })}
    </div>
  );
};

module.exports = RuleInput;
