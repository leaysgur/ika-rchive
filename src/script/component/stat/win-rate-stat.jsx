const React = require('react'); // eslint-disable-line no-unused-vars

const WinRateStat = ({
  winRateDetailByRule,
}) => {
  return (
    <div>
      <h2 className="ft-ika">ルールべつ</h2>
      {winRateDetailByRule.map((rule, idx) => {
        return (
          <div key={idx}>
            <table className="user-stat wrap fs-s">
              <tbody>
                <tr>
                  <td><span className={`fc-rule-${rule.id}`}>{rule.name}</span>合計</td>
                  <td className="slim">{rule.total}%</td>
                  <td className="slim">{rule.count}戦</td>
                </tr>
                {rule.detail.map((stage, idx) => {
                  return (
                    <tr key={idx}>
                      <td className="fs-s">{stage.name}</td>
                      <td className="slim">{stage.winRate}%</td>
                      <td className="slim">{stage.count}戦</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        );
      })}
    </div>
  );
};

module.exports = WinRateStat;
