const React = require('react');
const RecordModel = require('../model/record-model').getInstance();
const UserModel   = require('../model/user-model').getInstance();
const userState = require('../util/userState');

const TotalStat   = require('../component/user/total-stat.jsx');
const RecentStat  = require('../component/user/recent-stat.jsx');
const WinRateStat = require('../component/user/win-rate-stat.jsx');

class User extends React.Component {
  constructor() {
    super();

    this.state = userState(
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
    const {
      bestRate, totalIdx,
      winRate, winRateFree, winRateTag,
      missmatch,
      winStreak, loseStreak,
      koWinRate, koLoseRate,
      goodRule, badRule,
      goodStage, badStage,
      winRateDetail,
    } = this.state;

    return (
      <div className="view-user">
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

        <WinRateStat {...{winRateDetail,}} />

      </div>
    );
  }
}

module.exports = User;
