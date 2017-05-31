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
  avgRate:     PropTypes.string.isRequired,
  winRate:     PropTypes.string.isRequired,
  winRateFree: PropTypes.string.isRequired,
  winRateTag:  PropTypes.string.isRequired,
  missmatch:   PropTypes.string.isRequired,
  winStreak:   PropTypes.number.isRequired,
  loseStreak:  PropTypes.number.isRequired,
  koWinRate:   PropTypes.string.isRequired,
  koLoseRate:  PropTypes.string.isRequired,
  goodRule:    PropTypes.string.isRequired,
  badRule:     PropTypes.string.isRequired,
  goodStage:   PropTypes.string.isRequired,
  badStage:    PropTypes.string.isRequired,
  kdRatio:     PropTypes.number.isRequired,
};

module.exports = RecentStat;
