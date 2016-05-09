const React = require('react');

const {
  RATE_TABLE,
  MIN_RATE_INPUT, MAX_RATE_INPUT,
} = require('../../const');

const RateInput = ({
  rateRank,
  rateScore, _rateScore,
  onChange,
}) => {
  return (
    <div>
      <select
        name="rateRank"
        value={rateRank}
        onChange={(ev) => { onChange('rateRank', ev.target.value); }}
      >
        {Object.keys(RATE_TABLE).map((key, idx) => {
          return (
            <option key={idx} value={RATE_TABLE[key]}>
              {key}
            </option>
          );
        })}
      </select>

      <input
        name="rateScore" type="number"
        min={MIN_RATE_INPUT} max={MAX_RATE_INPUT}
        value={rateScore}
        placeholder={_rateScore}
        onChange={(ev) => { onChange('rateScore', ev.target.value); }}
      />
    </div>
  );
};

RateInput.propTypes = {
  rateRank:   React.PropTypes.string.isRequired,
  rateScore:  React.PropTypes.string.isRequired,
  _rateScore: React.PropTypes.string.isRequired,
  onChange:   React.PropTypes.func.isRequired,
};

module.exports = RateInput;
