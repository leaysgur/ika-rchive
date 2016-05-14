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
    const {
      canInput,
      onSave, onAfterSave,
    } = this.props;
    const setState = this.setState.bind(this);

    if (!canInput) { return; }

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

    let state = 'wait',
        label = 'ニュウリョクチュウ...';

    if (canInput) {
      state = 'set',
      label = 'トウロク！';
    }

    if (showReaction) {
      state = 'reaction',
      label = 'カンリョウ！';
    }

    return (
      <button
        disabled={!canInput}
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
