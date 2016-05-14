const React = require('react');
const assign = require('object-assign');

const Util = require('../../util');

const RuleInput         = require('../input/rule-input.jsx');
const SingleStageInput  = require('../input/single-stage-input.jsx');
const ResultInput       = require('../input/result-input.jsx');
const ResultOptionInput = require('../input/result-option-input.jsx');
const RateInput         = require('../input/rate-input.jsx');
const KDInput           = require('../input/kd-input.jsx');
const SaveBtn           = require('../input/save-btn.jsx');

class ModPopup extends React.Component {
  constructor(props) {
    super();

    this.state = assign({}, props.modItem);

    this.onChange = this.onChange.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onSave   = this.onSave.bind(this);
  }

  onChange(key, val) {
    let { rateRank, rateScore } = Util.getRankAndScore(this.state.rate);
    if (key === 'rateRank') {
      rateRank = val|0;
      this.setState({ rate: rateRank + rateScore });
      return;
    }
    if (key === 'rateScore') {
      rateScore = val|0;
      this.setState({ rate: rateRank + rateScore });
      return;
    }

    this.setState({ [key]: val });
  }

  onCancel() {
    this.props.onModify(null);
  }

  onSave() {
    this.props.onModify(this.state);
  }

  render() {
    const {
      rule,
      stage,
      result,
      tagmatch,
      missmatch,
      rate,
      kill, death,
    } = this.state;
    const { rateRank, rateScore } = Util.getRankAndScore(rate);
    const canInput = Util.canInput(rateScore);
    const isDisconnected = Util.isDisconnected(result);

    return (
      <div className="mod-layer">
        <ul className="wrap mod-wrap view-input">
          <li className="input-item">
            <RuleInput
              rule={''+rule}
              onChange={this.onChange}
            />
          </li>

          <li className="input-item">
            <SingleStageInput
              stage={''+stage}
              onChange={this.onChange}
            />
          </li>

          <li className="input-item">
            <ResultInput
              result={''+result}
              onChange={this.onChange}
            />
          </li>

          <li className="input-item">
            <ResultOptionInput
              isDisconnected={isDisconnected}
              tagmatch={!!tagmatch}
              missmatch={!!missmatch}
              onChange={this.onChange}
            />
          </li>

          <li className="input-item">
            <RateInput
              rateRank={''+rateRank}
              rateScore={''+rateScore}
              _rateScore={''+rateScore}
              onChange={this.onChange}
            />
          </li>

          <li className="input-item">
            <KDInput
              kill={''+kill}
              death={''+death}
              onChange={this.onChange}
            />
          </li>

          <li>
            <SaveBtn
              canInput={canInput}
              onSave={() => {}}
              onAfterSave={this.onSave}
            />
          </li>

          <li>
            <div className="ctrl-wrap">
              <span className="mod-mark" onTouchTap={this.onCancel}>[キャンセル]</span>
            </div>
          </li>
        </ul>
      </div>
    );
  }
}

module.exports = ModPopup;
