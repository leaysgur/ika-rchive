const React = require('react');
const PropTypes = require('prop-types');

const { RULE, } = require('../../const');

const RuleInput = ({
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

RuleInput.propTypes = {
  rule:     PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

module.exports = RuleInput;
