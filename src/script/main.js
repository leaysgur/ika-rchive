'use strict';
var Vue = require('vue');

require('./model/migrator');

window.IA = {
  eve:  require('./eve'),
  view: {
    gv: new Vue(require('./view/graph-view')),
    lv: new Vue(require('./view/list-view')),
    uv: new Vue(require('./view/user-view')),
    iv: new Vue(require('./view/input-view')),

    av: new Vue(require('./view/app-view'))
  }
};

// GAは本番でのみ動かす
if (location.hostname === 'localhost') { return; }

(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments);},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m);
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

window.ga('create', 'UA-67419977-1', 'auto');
window.ga('send', 'pageview');

window.onerror = function(err) {
  window.ga('send', 'exception', { exDescription: err });
  alert('何やらエラーが出たようです。\nごめんなさい・・。');
};
