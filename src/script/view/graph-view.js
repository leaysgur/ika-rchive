'use strict';
let Eve = require('../util/eve');
let Chart = require('chart.js');
let Const = require('../const');
let Util  = require('../util');
let RecordModel = require('../model/record-model').getInstance();

let labelLimit = Util.isMobile() ? Const.SHOW_LABEL_LIMIT_MOBILE : Const.SHOW_LABEL_LIMIT_PC;

// Observableなのは変数
let RECORDS = RecordModel.get('items');

module.exports = {
  el: '#js-view-graph',
  data: {
    records:   RECORDS,
    canvasW:   ((window.innerWidth * 0.9)|0) + 'px',
    canvasH:   ((window.innerHeight * 0.4)|0) + 'px',
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
      let that = this;
      this._ctx = this.$els.graph.getContext('2d');
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
      let data = {
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
      let options = {
        bezierCurve:        false,
        scaleFontColor:     '#fff',
        scaleGridLineColor: 'rgba(255, 110, 0, .25)',
        pointDotRadius :    1,
        scaleLabel:         Util.getRateStr,
        tooltipTemplate:    Util.getRateStr
      };
      if (this._graph) { this._graph.destroy(); }
      this._graph = new Chart(this._ctx).Line(data, options);
    },
    _toGraphData: (records) => {
      return records.map((item) => {
        return item.rate;
      });
    },
    _toGraphLabel: (records) => {
      let isShortLabel = records.length > labelLimit;

      return records.map((_item, idx) => {
        let cnt = idx + 1;
        // ラベルがごちゃつきすぎるので、件数増えてきたら10件ごと
        if (isShortLabel) {
          return (cnt % 10 === 0) ? cnt : '';
        } else {
          return cnt;
        }
      });
    }
  }
};
