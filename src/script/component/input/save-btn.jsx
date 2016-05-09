const React = require('react'); // eslint-disable-line no-unused-vars

class SaveBtn extends React.Component {
  constructor() {
    super();

    this.state = {
      _timer:       null,
      showReaction: false
    };

    this.onSave = this.onSave.bind(this);
  }

  onSave() {
    const setState = this.setState.bind(this);
    this.props.onSave();

    setState({ showReaction: true });
    this._timer = setTimeout(function() {
      setState({ showReaction: false });
    }, 1000);
  }

  render() {
    const { canInput, } = this.props;
    const { showReaction, } = this.state;

    let disabled = true,
        state = 'wait',
        label = 'ニュウリョクチュウ...';

    if (canInput) {
      disabled = false,
      state = 'set',
      label = 'トウロク！';
    }

    if (showReaction) {
      disabled = true,
      state = 'reaction',
      label = 'カンリョウ！';
    }

    return (
      <button
        disabled={disabled}
        className={`${state}-button ft-ika`}
        onTouchTap={this.onSave}
      >{label}</button>
    );
  }
}

SaveBtn.propTypes = {
  canInput: React.PropTypes.bool.isRequired,
  onSave:   React.PropTypes.func.isRequired,
};

module.exports = SaveBtn;
