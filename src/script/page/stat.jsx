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
    const {
      bestRate, totalIdx,
      winRate, winRateFree, winRateTag,
      missmatch,
      winStreak, loseStreak,
      koWinRate, koLoseRate,
      goodRule, badRule,
      goodStage, badStage,
      winRateDetailByRule,
      kdRatio,
      avgRate,
    } = this.state;
    const tweetUrl = !!latestRecord
      ? Util.getTweetUrl(Util.getRateStr(latestRecord.rate), this.state)
      : null;

    if (totalIdx === 0) {
      return (
        <div className="view-stat">
          <div className="stat-cover">
            <p className="wrap">まだデータが<span className="ft-ika">トウロク</span>されてないぞ！</p>
          </div>
        </div>
      );
    }

    return (
      <div className="view-stat">
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
          kdRatio,
          avgRate,
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
