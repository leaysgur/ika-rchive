const React = require('react');

const RecordModel = require('../model/record').getInstance();
const UserModel   = require('../model/user').getInstance();
const Const = require('../const');
const Util  = require('../util');

const RuleInput         = require('../component/input/rule-input.jsx');
const StageInput        = require('../component/input/stage-input.jsx');
const ResultInput       = require('../component/input/result-input.jsx');
const ResultOptionInput = require('../component/input/result-option-input.jsx');
const RateInput         = require('../component/input/rate-input.jsx');
const SaveBtn           = require('../component/input/save-btn.jsx');


class InputPage extends React.Component {
  constructor() {
    super();

    // 本セッションでの増減を見る用
    const last = RecordModel.getLatestRecord();
    // 初期表示用
    const rate = RecordModel.getLatestRate();

    this.state = {
      rule:       '1',
      stageA:     '1',
      stageB:     '6',
      stage:      'stageA',
      result:     '1',
      missmatch:  false,
      tagmatch:   false,
      rateRank:   rate.rank || '600',
      rateScore:  '',
      _rateScore: rate.score, // 実体は↑で、これはplaceholder用
      lastScore:  last ? last.rate : 0,
      recentRateGap: Util.getRecentRateGap(0, 0),
    };

    this.onChange = this.onChange.bind(this);
    this.onSave   = this.onSave.bind(this);
  }

  onChange(key, val) {
    this.setState({ [key]: val });
  }

  onSave() {
    const record = {
      result:    this.state.result|0,
      missmatch: this.state.missmatch|0,
      tagmatch:  this.state.tagmatch|0,
      rule:      this.state.rule|0,
      stage:     this.state[this.state.stage]|0,
      rate:      (this.state.rateRank|0) + (this.state.rateScore|0)
    };
    RecordModel.setRecord(record);
    // 通算バトル数も更新
    UserModel.updateTotalIdx();
    // ベストウデマエも更新
    UserModel.updateBestRate(record.rate);

    if (Util.isMobile()) {
      this.setState({
        rateScore: '', // モバイルでだけ消したい
        _rateScore: this.state.rateScore,
        recentRateGap: Util.getRecentRateGap(record.rate, this.state.lastScore),
        missmatch: false
      });
    } else {
      this.setState({
        _rateScore: this.state.rateScore,
        recentRateGap: Util.getRecentRateGap(record.rate, this.state.lastScore),
        missmatch: false
      });
    }
  }

  render() {
    const { route } = this.props;
    const {
      rule,
      stage, stageA, stageB,
      result,
      missmatch, tagmatch,
      rateRank, rateScore, _rateScore,
      recentRateGap,
    } = this.state;
    const isDisconnected = Util.isDisconnected(result);
    const canInput = Util.canInput(rateScore);

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
            <ResultOptionInput
              tagmatch={tagmatch}
              missmatch={missmatch}
              isDisconnected={isDisconnected}
              onChange={this.onChange}
            />
          </li>

          <li className="input-item">
            <RateInput
              RATE_TABLE={Const.RATE_TABLE}
              rateRank={rateRank}
              MIN_RATE_INPUT={Const.MIN_RATE_INPUT}
              MAX_RATE_INPUT={Const.MAX_RATE_INPUT}
              rateScore={rateScore}
              _rateScore={_rateScore}
              onChange={this.onChange}
            />
          </li>
        </ul>

        <div className="report">
          今回のウデマエ増減: <span className="ft-emp">{recentRateGap.ratePfx}{recentRateGap.rateGap}</span>
        </div>

        <SaveBtn
          canInput={canInput}
          onSave={this.onSave}
        />

        <div className="note">※マッチング事故は、回線落ちで4vs3で負けた時などに目印として使います。</div>
        <div className="note">※今回のウデマエ増減は、ページ再読み込みでリセットされます。</div>
      </div>
    );
  }
}

module.exports = InputPage;
