const React = require('react');

const RecordModel = require('../model/record').getInstance();
const UserModel   = require('../model/user').getInstance();

const Util = require('../util');

class OthersPage extends React.Component {
  render() {
    const { route } = this.props;

    return (
      <div className={`view-${route.path}`}>

        <h2 className="ft-ika">つかいかた</h2>
        <div className="wrap">
          <p>バトル後に<span className="ft-ika">ウデマエ</span>を<span className="ft-ika">トウロク</span>だ！</p>
          <p>データは<span className="ft-ika">キロク</span>や<span className="ft-ika">セイセキ</span>から見れるぞ！</p>
        </div>

        <h2 className="ft-ika">これナニ？</h2>
        <div className="wrap">
          <p>にわかガチ勢の<a href="https://twitter.com/leader22" target="_blank">@leader22</a>が、ウデマエの上下を可視化するために個人的に作ったものだ！</p>
          <p>なんか変な動きするとかこんな機能が欲しいとか、報告すれば良いことがあるかもしれないぞ！</p>
        </div>

        <h2 className="ft-ika">ヒミツヘイキ</h2>
        <ul className="wrap list">
          <li><a href="#" onTouchTap={this.onClickResetBestRate}>最高ウデマエをリセットする</a></li>
          <li><a href="#" onTouchTap={this.onClickRestart}>データ全削除してはじめから</a></li>
        </ul>

      </div>
    );
  }

  onClickResetBestRate(ev) {
    ev.preventDefault();

    if (window.confirm('変更したデータは元に戻せません。\n本当に最高ウデマエをリセットしますか？')) {
      UserModel.clearBestRate();

      Util.reload();
    }
  }

  onClickRestart(ev) {
    ev.preventDefault();

    if (window.confirm('削除したデータは元に戻せません。\n本当に全削除しますか？')) {
      UserModel.clearAllData();
      RecordModel.clearAllData();

      Util.reload();
    }
  }
}

module.exports = OthersPage;
