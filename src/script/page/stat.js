const React = require('react');
const RecordModel = require('../model/record').getInstance();
const UserModel   = require('../model/user').getInstance();
const statState = require('../util/statState');

const TotalStat   = require('../component/stat/total-stat.jsx');
const RecentStat  = require('../component/stat/recent-stat.jsx');
const WinRateStat = require('../component/stat/win-rate-stat.jsx');

class StatPage extends React.Component {
  constructor() {
    super();

    this.state = statState(
      RecordModel.get('items'),
      UserModel.get('bestRate'),
      UserModel.get('totalIdx')
    );
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.route.path !== this.props.route.path) {
      return true;
    }
    return false;
  }

  render() {
    const { route } = this.props;
    const {
      bestRate, totalIdx,
      winRate, winRateFree, winRateTag,
      missmatch,
      winStreak, loseStreak,
      koWinRate, koLoseRate,
      goodRule, badRule,
      goodStage, badStage,
      winRateDetailByRule,
    } = this.state;

    return (
      <div className={`view-${route.path}`}>
        <TotalStat {...{
          bestRate, totalIdx,
        }} />

        <RecentStat {...{
          winRate, winRateFree, winRateTag,
          missmatch,
          winStreak, loseStreak,
          koWinRate, koLoseRate,
          goodRule, badRule,
          goodStage, badStage,
        }} />

        <a className="tweet-button ft-ika" target="_blank" href="tweetUrl" v-show="canTweet">セイセキをツイート！</a>

        <WinRateStat {...{winRateDetailByRule,}} />

      </div>
    );
  }
}

module.exports = StatPage;
