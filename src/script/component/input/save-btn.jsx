const React = require('react');

let _timer = null;

class SaveBtn extends React.Component {
  constructor() {
    super();

    this.state = {
      showReaction: false
    };

    this.onSave = this.onSave.bind(this);
  }

  onSave() {
    const { onSave, onAfterSave } = this.props;
    const setState = this.setState.bind(this);

    onSave();
    setState({ showReaction: true });
    _timer = setTimeout(function() {
      setState({ showReaction: false });
      onAfterSave();
    }, 1000);
  }

  componentWillUnmount() {
    clearTimeout(_timer);
    _timer = null;
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
  canInput:    React.PropTypes.bool.isRequired,
  onSave:      React.PropTypes.func.isRequired,
  onAfterSave: React.PropTypes.func,
};

SaveBtn.defaultProps = {
  onAfterSave: () => {},
};

module.exports = SaveBtn;
