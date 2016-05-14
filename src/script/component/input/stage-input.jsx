const React = require('react');

const { STAGE, } = require('../../const');
const STAGE_AB = ['stageA', 'stageB'];

const StageInput = ({
  stage, stageAandB,
  onChange,
}) => {
  return (
    <div>
      {STAGE_AB.map((stageAorB, idx) => {
        return (
          <div className="stage-select" key={idx}>
            <input
              type="radio" name="stage"
              value={stageAorB} checked={stage === stageAorB}
              onChange={(ev) => { onChange('stage', ev.target.value); }}
            />
            <select
              name={stageAorB}
              value={stageAandB[stageAorB]}
              onChange={(ev) => { onChange(stageAorB, ev.target.value); }}
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
      })}
    </div>
  );
};

StageInput.propTypes = {
  stage:      React.PropTypes.oneOf(STAGE_AB).isRequired,
  stageAandB: React.PropTypes.shape({
    [STAGE_AB[0]]: React.PropTypes.string.isRequired,
    [STAGE_AB[1]]: React.PropTypes.string.isRequired,
  }).isRequired,
  onChange:   React.PropTypes.func.isRequired,
};

module.exports = StageInput;
