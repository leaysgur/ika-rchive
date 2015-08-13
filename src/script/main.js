'use strict';
var Vue = require('vue');

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
