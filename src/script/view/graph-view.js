'use strict';
var Vue   = require('vue');
var Chart = require('chart.js');
var Util  = require('../util');
var RecordModel = require('../model/record-model').getInstance();

module.exports = Vue.extend({
  el: function() { return '#js-view-graph'; },
  data: function() {
    return {
      records: RecordModel.data,
      canvasW: ((window.innerWidth * 0.9)|0) + 'px',
      canvasH: ((window.innerHeight * 0.25)|0) + 'px',
    };
  },
  watch: {
    records: function() {
      this.drawGraph();
    }
  },
  events: {
    'hook:ready': function() {
      this._ctx = this.$$.graph.getContext('2d');
      this.drawGraph();
    }
  },
  methods: {
    drawGraph: function() {
      var data = {
        labels: this._toGraphLabel(this.records),
        datasets: [
          {
            fillColor: 'rgba(151,187,205,0.2)',
            strokeColor: 'rgba(151,187,205,1)',
            pointColor: 'rgba(151,187,205,1)',
            data: this._toGraphData(this.records)
          }
        ]
      };
      var options = {
        bezierCurve:     false,
        scaleLabel:      Util.getRateStr,
        tooltipTemplate: Util.getRateStr
      };
      if (this._graph) { this._graph.destroy(); }
      this._graph = new Chart(this._ctx).Line(data, options);
    },
    _toGraphData: function(records) {
      return records.map(function(item) {
        return item.rate;
      });
    },
    _toGraphLabel: function(records) {
      return records.map(function(item, idx) {
        return idx + 1;
      });
    }
  }
});



