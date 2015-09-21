'use strict';
let Vue = require('vue');

// バージョン差異を吸収するので最初
require('./model/migrator');

// 便利なコ
require('./eve');

// 各ページ
new Vue(require('./view/graph-view'));
new Vue(require('./view/list-view'));
new Vue(require('./view/user-view'));
new Vue(require('./view/input-view'));

// 各ページを読み込んでから
new Vue(require('./view/app-view'));

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
