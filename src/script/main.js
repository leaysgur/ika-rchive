'use strict';
// var App = require('./app');
var RecordModel = require('./model/record-model');
var Util = require('./util');
var $     = require('jquery');
var Chart = require('chart.js');

var record = new RecordModel();

var ctx = $('#js-graph-area')[0].getContext('2d');
var data = {
  labels: record.toChartLabel(),
  datasets: [
    {
      fillColor: 'rgba(151,187,205,0.2)',
      strokeColor: 'rgba(151,187,205,1)',
      pointColor: 'rgba(151,187,205,1)',
      data: record.toChartData()
    }
  ]
};
var options = {
  bezierCurve: false,
  scaleLabel: Util.getRankStr,
  tooltipTemplate: Util.getRankStr
};
new Chart(ctx).Line(data, options);

window.record = record;
