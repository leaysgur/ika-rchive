'use strict';

require('./filter/list-filter');

var ListView  = require('./view/list-view');
var GraphView = require('./view/graph-view');
var InputView = require('./view/input-view');

new ListView();
new GraphView();
new InputView();
