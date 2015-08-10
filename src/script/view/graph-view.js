'use strict';
var Vue   = require('vue');
var $     = require('jquery');
var Chart = require('chart.js');
var Util  = require('../util');
var RecordModel = require('../model/record-model').getInstance();

module.exports = Vue.extend({
  el: function() { return '#js-view-graph'; },
  events: {
    'hook:created': function() {
      var ctx = $('#js-graph-area')[0].getContext('2d');
      var data = {
        labels: RecordModel.toGraphLabel(),
        datasets: [
          {
            fillColor: 'rgba(151,187,205,0.2)',
            strokeColor: 'rgba(151,187,205,1)',
            pointColor: 'rgba(151,187,205,1)',
            data: RecordModel.toGraphData()
          }
        ]
      };
      var options = {
        bezierCurve:     false,
        scaleLabel:      Util.getRateStr,
        tooltipTemplate: Util.getRateStr
      };
      new Chart(ctx).Line(data, options);
    }
  }
});



