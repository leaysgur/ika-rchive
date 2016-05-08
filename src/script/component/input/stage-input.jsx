const React = require('react'); // eslint-disable-line no-unused-vars

const StageInput = ({
  STAGE,
  stage, stageAandB,
  onChange,
}) => {
  return (
    <div>
      {['stageA', 'stageB'].map((stageAorB, idx) => {
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

module.exports = StageInput;
