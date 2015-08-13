'use strict';
var Eve = require('../eve');
var Chart = require('chart.js');
var Util  = require('../util');
var RecordModel = require('../model/record-model').getInstance();

module.exports = {
  el: '#js-view-graph',
  data: {
    records:   RecordModel.data,
    canvasW:   ((window.innerWidth * 0.9)|0) + 'px',
    canvasH:   ((window.innerHeight * 0.25)|0) + 'px',
    _isHidden: false,
    _timer:    null
  },
  watch: {
    records: function() {
      // キロクのサクジョで動くのはコレ
      // 新規登録の場合はisHiddenなので動かない
      this._isHidden || this.drawGraph();
    }
  },
  events: {
    'hook:ready': function() {
      var that = this;
      this._ctx = this.$$.graph.getContext('2d');
      this.drawGraph();

      // isHiddenな時にdrawGraphするとcanvas不在でバグるので
      // isHiddenかどうかをチェックしないといけない
      Eve.on('showPane', function(pane) {
        that._isHidden = (pane !== 'record');

        // タブを押した瞬間だと早すぎる
        that._timer = setTimeout(function() {
          that._isHidden || that.drawGraph();
        }, 500);
      });
    }
  },
  methods: {
    drawGraph: function() {
      var data = {
        labels: this._toGraphLabel(this.records),
        datasets: [
          {
            fillColor:   'rgba(255, 110, 0, .5)',
            strokeColor: '#FF6E00',
            pointColor:  '#FF6E00',
            data: this._toGraphData(this.records)
          }
        ]
      };
      var options = {
        bezierCurve:     false,
        scaleFontColor:  '#fff',
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
};
