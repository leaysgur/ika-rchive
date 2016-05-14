const React = require('react'); // eslint-disable-line no-unused-vars

const ReactDOM = require('react-dom');
const UserModel = require('./model/user-model').getInstance();

// 何より先に環境チェック
try {
  localStorage.setItem('IA_TEST', 'TEST');
  localStorage.removeItem('IA_TEST');
} catch(e) {
  alert('お使いの環境ではご利用いただけません。\nプライベートブラウズはOFFにしてください。');
}

// GAは本番でのみ動かす(return; だけ返すとbabelifyでoutside funcエラーになる)
if (location.hostname !== 'localhost') {
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments);},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m);
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  window.ga('create', 'UA-67419977-1', 'auto');
  window.ga('send', 'pageview');

  window.onerror = (err) => {
    window.ga('send', 'exception', { exDescription: err });
    alert('何やらエラーが出たようです。\nごめんなさい・・。');
  };
}

console.log(UserModel);

const isFirstTime = UserModel.get('isFirstTime');

const App = () => {
  return (
    <div>Hello</div>
  );
};

if (isFirstTime) {
} else {
  ReactDOM.render(
    <App />,
    document.getElementById('jsApp')
  );
}
