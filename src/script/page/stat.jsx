const React = require('react');
const assign = require('object-assign');

const RecordModel = require('../model/record').getInstance();
const UserModel   = require('../model/user').getInstance();

const statReducer = require('../reducer/stat');

const Util = require('../util');

const TotalStat   = require('../component/stat/total-stat.jsx');
const RecentStat  = require('../component/stat/recent-stat.jsx');
const WinRateStat = require('../component/stat/win-rate-stat.jsx');

const latestRecord = RecordModel.getLatestRecord();

class StatPage extends React.Component {
  constructor() {
    super();

    this.state = assign(
      statReducer(RecordModel.get('items')),
      {
        bestRate: Util.getRateStr(UserModel.get('bestRate')),
        totalIdx: UserModel.get('totalIdx')|0,
      }
    );
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
    const tweetUrl = !!latestRecord
      ? Util.getTweetUrl(Util.getRateStr(latestRecord.rate), winRate)
      : null;

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

        {
          tweetUrl
            ? <a className="tweet-button ft-ika" target="_blank" href={tweetUrl}>セイセキをツイート！</a>
            : null
        }

        <WinRateStat {...{winRateDetailByRule,}} />

      </div>
    );
  }
}

module.exports = StatPage;
