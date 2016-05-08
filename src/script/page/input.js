const React = require('react');
const RecordModel = require('../model/record').getInstance();
const UserModel   = require('../model/user').getInstance();

const Const = require('../const');

class InputPage extends React.Component {
  constructor() {
    super();

    this.state = {
      rule: '1',
    };
  }

  onChange(key, val) {
    this.setState({ [key]: val });
  }

  render() {
    const { route } = this.props;
    const {
      rule,
    } = this.state;
    console.info(this.state);

    return (
      <div className={`view-${route.path}`}>
        <ul className="input-wrap wrap">

          <li className="input-item">
            {Object.keys(Const.RULE).map((key, idx) => {
              return (
                <label key={idx}>
                  <input name="rule" type="radio" value={key} onChange={(ev) => { this.onChange('rule', ev.target.value); }} checked={rule === key} />{Const.RULE[key]}
                </label>
              );
            })}
          </li>

          {/*
          <li className="input-item">
            <div className="stage-select">
              <input type="radio" name="chosenStage" value="stageA" v-model="chosenStage" />
              <select v-model="stageA">
                <option v-for="option in stages" value="option.value">
                  {option.text}
                </option>
              </select>
            </div>
            <div className="stage-select">
              <input type="radio" name="chosenStage" value="stageB" v-model="chosenStage" />
              <select v-model="stageB">
                <option v-for="option in stages" value="option.value">
                  {option.text}
                </option>
              </select>
            </div>
          </li>
          <li className="input-item">
            <label v-for="value in results">
              <input name="result" type="radio" v-model="result" value="{{$key}}" />{{value}}
            </label>
          </li>
          <li className="input-item">
            <label>
              <input type="checkbox" v-model="missmatch" disabled="isDisconnected" />マッチング事故
            </label>
            <label>
              <input type="checkbox" v-model="tagmatch" />タッグマッチ
            </label>
          </li>
          <li className="input-item">
            <select v-model="rateRank">
              <option v-for="option in rates" value="option.value">
                {option.text}
              </option>
            </select>
            <input v-model="rateScore" type="number" min="0" max="99" />
          </li>
          */}
        </ul>
        {/*
        <div className="report">ウデマエ増減速報: <span className="ft-emp">{{recentRatePfx}}{{recentRateGap}}</span></div>
        */}
        <button v-show="!showSetReaction && !canSet" disabled className="wait-button ft-ika">ニュウリョクチュウ...</button>
        <button v-show="!showSetReaction && canSet" className="set-button ft-ika" click="onClickSet">トウロク！</button>
        <button v-show="showSetReaction" disabled className="reaction-button ft-ika">トウロクカンリョウ！</button>
        <div className="note">※マッチング事故は、S,S,A+,A vs A-,A-,B+,Bみたいな慈悲のないマッチングや、回線落ちで4 vs 3で負けた時などに使います。</div>
        <div className="note">※ウデマエ増減速報は、ページ再読み込みでリセットされます。</div>
      </div>
    );
  }
}

module.exports = InputPage;
