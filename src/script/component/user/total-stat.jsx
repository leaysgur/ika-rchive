const React = require('react'); // eslint-disable-line no-unused-vars

const TotalStat = ({
  bestRate, totalIdx,
}) => {
  return (
    <div>
      <h2 className="ft-ika">ツウサン</h2>

      <table className="user-stat wrap fs-s">
        <tbody>
          <tr>
            <td>最高ウデマエ</td>
            <td>{bestRate}</td>
          </tr>
          <tr>
            <td>バトル回数</td>
            <td>{totalIdx}回</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

module.exports = TotalStat;
