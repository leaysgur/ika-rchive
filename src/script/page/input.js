const React = require('react');

const RecordModel = require('../model/record').getInstance();
const Const = require('../const');
const Util  = require('../util');

const RuleInput   = require('../component/input/rule-input.jsx');
const StageInput  = require('../component/input/stage-input.jsx');
const ResultInput = require('../component/input/result-input.jsx');

class InputPage extends React.Component {
  constructor() {
    super();

    const rate = RecordModel.getLatestRate();

    this.state = {
      rule:      '1',
      stageA:    '1',
      stageB:    '6',
      stage:     'stageA',
      result:    '1',
      missmatch: false,
      tagmatch:  false,
      rateRank:  rate.rank || '600',
      rateScore: '',
      _rateScore: rate.score, // 実体は↑で、これはplaceholder用
    };

    this.onChange = this.onChange.bind(this);
  }

  onChange(key, val) {
    this.setState({ [key]: val });
  }

  render() {
    const { route } = this.props;
    const {
      rule,
      stage, stageA, stageB,
      result,
      rateRank, rateScore, _rateScore,
    } = this.state;
    const isDisconnected = Util.isDisconnected(result);
    console.info(JSON.stringify(this.state, null, 2));

    return (
      <div className={`view-${route.path}`}>
        <ul className="input-wrap wrap">

          <li className="input-item">
            <RuleInput
              RULE={Const.RULE}
              rule={rule}
              onChange={this.onChange}
            />
          </li>

          <li className="input-item">
            <StageInput
              STAGE={Const.STAGE}
              stage={stage}
              stageAandB={{ stageA, stageB, }}
              onChange={this.onChange}
            />
          </li>

          <li className="input-item">
            <ResultInput
              RESULT={Const.RESULT}
              result={result}
              onChange={this.onChange}
            />
          </li>

          <li className="input-item">
            <label>
              <input
                name="missmatch" type="checkbox"
                disabled={isDisconnected}
                onChange={(ev) => { this.onChange('missmatch', ev.target.checked); }}
              />マッチング事故
            </label>

            <label>
              <input
                name="tagmatch" type="checkbox"
                onChange={(ev) => { this.onChange('tagmatch', ev.target.checked); }}
              />タッグマッチ
            </label>
          </li>

          <li className="input-item">
            <select
              name="rateRank"
              value={rateRank}
              onChange={(ev) => { this.onChange('rateRank', ev.target.value); }}
            >
              {Object.keys(Const.RATE_TABLE).map((key, idx) => {
                return (
                  <option key={idx} value={Const.RATE_TABLE[key]}>
                    {key}
                  </option>
                );
              })}
            </select>

            <input
              name="rateScore" type="number"
              min={Const.MIN_RATE_INPUT} max={Const.MAX_RATE_INPUT}
              value={rateScore}
              placeholder={_rateScore}
              onChange={(ev) => { this.onChange('rateScore', ev.target.value); }}
            />
          </li>
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
