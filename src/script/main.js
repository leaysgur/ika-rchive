'use strict';

require('./filter/list-filter');

var GraphView = require('./view/graph-view');
var ListView  = require('./view/list-view');
var UserView  = require('./view/user-view');
var InputView = require('./view/input-view');

new GraphView();
new ListView();
new UserView();
new InputView();
