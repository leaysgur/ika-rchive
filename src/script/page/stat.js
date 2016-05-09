const React = require('react');
const assign = require('object-assign');

const RecordModel = require('../model/record').getInstance();
const UserModel   = require('../model/user').getInstance();

const Util      = require('../util');
const statState = require('../util/statState');

const TotalStat   = require('../component/stat/total-stat.jsx');
const RecentStat  = require('../component/stat/recent-stat.jsx');
const WinRateStat = require('../component/stat/win-rate-stat.jsx');

class StatPage extends React.Component {
  constructor() {
    super();

    const latestRecord = RecordModel.getLatestRecord();
    const tweetUrl = !!latestRecord
      ? Util.getTweetUrl(Util.getRateStr(latestRecord.rate), UserModel.get('winRate'))
      : null;

    this.state = assign(
      statState(RecordModel.get('items')),
      {
        bestRate: Util.getRateStr(UserModel.get('bestRate')),
        totalIdx: UserModel.get('totalIdx')|0,
        tweetUrl: tweetUrl,
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
      tweetUrl,
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
