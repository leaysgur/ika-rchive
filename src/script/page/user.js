const React = require('react');
const RecordModel = require('../model/record-model').getInstance();
const UserModel   = require('../model/user-model').getInstance();
const userState = require('../util/userState');

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

        <a className="tweet-button ft-ika" target="_blank" href="tweetUrl" v-show="canTweet">セイセキをツイート！</a>

        {winRateDetail.map((rule, idx) => {
          return (
            <div key={idx}>
              <h3 className="ft-ika">{rule.name}のショウリツ</h3>
              <table className="user-stat wrap fs-s">
                <tbody>
                  <tr>
                    <td>{rule.name}合計</td>
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
  }
}

module.exports = User;
