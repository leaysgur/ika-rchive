const React = require('react'); // eslint-disable-line no-unused-vars

const ResultOptionInput = ({
  isDisconnected,
  onChange,
}) => {
  return (
    <div>
      <label>
        <input
          name="missmatch" type="checkbox"
          disabled={isDisconnected}
          onChange={(ev) => { onChange('missmatch', ev.target.checked); }}
        />マッチング事故
      </label>

      <label>
        <input
          name="tagmatch" type="checkbox"
          onChange={(ev) => { onChange('tagmatch', ev.target.checked); }}
        />タッグマッチ
      </label>
    </div>
  );
};

module.exports = ResultOptionInput;
