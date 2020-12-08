const ReactDOM = require('react-dom');
const injectTapEventPlugin = require('react-tap-event-plugin');
const UserModel = require('./model/user').getInstance();
const Router = require('./router.jsx');

window.onerror = (err) => {
  console.error(err);
  alert('何やらエラーが出たようです。\nごめんなさい・・。');
};

// 何より先に環境チェック
try {
  localStorage.setItem('IA_TEST', 'TEST');
  localStorage.removeItem('IA_TEST');
} catch(e) {
  alert('お使いの環境ではご利用いただけません。\nプライベートブラウズはOFFにしてください。');
}

const $app  = document.getElementById('jsApp');
const $boot = document.getElementById('jsBootApp');

// 最初は見えなくて、ふわっと起動する
$app.classList.add('is-booted');

if (UserModel.get('isFirstTime')) {
  $boot.addEventListener('click', _boot, false);
} else {
  _boot();
}

function _boot() {
  injectTapEventPlugin();

  UserModel.set('isFirstTime', false);
  ReactDOM.render(
    Router,
    $app
  );
}
