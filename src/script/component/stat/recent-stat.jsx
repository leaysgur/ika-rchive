const React = require('react');

const {
  RULE, STAGE,
} = require('../../const');

const RecentStat = ({
  avgRate,
  winRate, winRateFree, winRateTag,
  missmatch,
  winStreak, loseStreak,
  koWinRate, koLoseRate,
  goodRule, badRule,
  goodStage, badStage,
  kdRatio,
}) => {
  return (
    <div>
      <h2 className="ft-ika">チョッキン</h2>

      <table className="user-stat wrap fs-s">
        <tbody>
          <tr>
            <td>適正ウデマエ</td>
            <td>{avgRate}</td>
          </tr>
          <tr>
            <td>全体の勝率</td>
            <td>{winRate}%</td>
          </tr>
          <tr>
            <td>野良の勝率</td>
            <td>{winRateFree}%</td>
          </tr>
          <tr>
            <td>タッグの勝率</td>
            <td>{winRateTag}%</td>
          </tr>
          <tr>
            <td>マッチング事故率</td>
            <td>{missmatch}%</td>
          </tr>
          <tr>
            <td>連勝記録</td>
            <td>{winStreak}連勝</td>
          </tr>
          <tr>
            <td>連敗記録</td>
            <td>{loseStreak}連敗</td>
          </tr>
          <tr>
            <td>KO勝ち率</td>
            <td>{koWinRate}%</td>
          </tr>
          <tr>
            <td>KO負け率</td>
            <td>{koLoseRate}%</td>
          </tr>
          <tr>
            <td>キルレ</td>
            <td>{kdRatio}</td>
          </tr>
          <tr>
            <td>勝ってるルール</td>
            <td>{RULE[goodRule] || '-'}</td>
          </tr>
          <tr>
            <td>負けてるルール</td>
            <td>{RULE[badRule] || '-'}</td>
          </tr>
          <tr>
            <td>勝ってるステージ</td>
            <td className="fs-s">{STAGE[goodStage] || '-'}</td>
          </tr>
          <tr>
            <td>負けてるステージ</td>
            <td className="fs-s">{STAGE[badStage] || '-'}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

RecentStat.propTypes = {
  avgRate:     React.PropTypes.string.isRequired,
  winRate:     React.PropTypes.string.isRequired,
  winRateFree: React.PropTypes.string.isRequired,
  winRateTag:  React.PropTypes.string.isRequired,
  missmatch:   React.PropTypes.string.isRequired,
  winStreak:   React.PropTypes.number.isRequired,
  loseStreak:  React.PropTypes.number.isRequired,
  koWinRate:   React.PropTypes.string.isRequired,
  koLoseRate:  React.PropTypes.string.isRequired,
  goodRule:    React.PropTypes.string.isRequired,
  badRule:     React.PropTypes.string.isRequired,
  goodStage:   React.PropTypes.string.isRequired,
  badStage:    React.PropTypes.string.isRequired,
  kdRatio:     React.PropTypes.number.isRequired,
};

module.exports = RecentStat;
