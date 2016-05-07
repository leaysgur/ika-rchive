const React = require('react'); // eslint-disable-line no-unused-vars

const RecentStat = ({
  winRate, winRateFree, winRateTag,
  missmatch,
  winStreak, loseStreak,
  koWinRate, koLoseRate,
  goodRule, badRule,
  goodStage, badStage,
}) => {
  return (
    <div>
      <h2 className="ft-ika">チョッキン</h2>

      <table className="user-stat wrap fs-s">
        <tbody>
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
            <td>得意なルール</td>
            <td>{goodRule || '-'}</td>
          </tr>
          <tr>
            <td>苦手なルール</td>
            <td>{badRule || '-'}</td>
          </tr>
          <tr>
            <td>得意なステージ</td>
            <td className="fs-s">{goodStage || '-'}</td>
          </tr>
          <tr>
            <td>苦手なステージ</td>
            <td className="fs-s">{badStage || '-'}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

module.exports = RecentStat;
