const React = require('react');
const assign = require('object-assign');

const Util = require('../../util');

const RuleInput         = require('../input/rule-input.jsx');
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
      rate,
    } = this.state;
    const { rateRank, rateScore } = Util.getRankAndScore(rate);
    const canInput = Util.canInput(rateScore);

    return (
      <div>
        <ul className="wrap mod-wrap view-input">
          <li className="input-item">
            <RuleInput
              rule={''+rule}
              onChange={this.onChange}
            />
          </li>
          <li>
            <SaveBtn
              canInput={canInput}
              onSave={this.onSave}
            />
          </li>
          <li>
            {JSON.stringify(this.state, null, 2)}
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
