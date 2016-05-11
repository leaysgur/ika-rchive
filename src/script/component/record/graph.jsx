const React = require('react');
const Chart = require('chart.js');
Chart.defaults.global.defaultFontColor = '#fff';

const Util = require('../../util');
const {
  RULE_COLOR,
} = require('../../const');

// TODO: util/toGraphState?Props?ってなるので別のなんかに
function toGraphData(records) {
  const ret = {
    data:            [],
    backgroundColor: []
  };

  // 1ループで必要なデータを集める
  records.forEach((item) => {
    ret.data.push(item.rate);
    ret.backgroundColor.push(RULE_COLOR[item.rule]);
  });

  return ret;
}

class Graph extends React.Component {
  componentDidMount() {
    const { records } = this.props;
    if (records.length === 0) { return; }
    this._drawGraph();
  }

  _drawGraph() {
    const { records } = this.props;
    const ctx = this.refs.graph.getContext('2d');
    const {
      data, backgroundColor,
    } = toGraphData(records);

    const cData = {
      labels: new Array(records.length),
      datasets: [{
        data:  data,
        label: null,
        backgroundColor: backgroundColor,
      }, {
        data:  data,
        label: null,
        backgroundColor: backgroundColor,
      }]
    };

    const min = Math.floor(Math.min.apply(null, data) / 10) * 10;
    const max = Math.ceil(Math.max.apply(null, data) / 10) * 10;

    const cOptions = {
      responsive: false,
      events: ['mousemove', 'touchstart'],
      legend: { display: false },
      tooltips: {
        callbacks: {
          title: () => { return ''; },
          label: (item) => {
            return Util.getRateStr(item.yLabel);
          }
        }
      },
      scales: {
        xAxes: [{
          display: false,
          barPercentage: 1.2,
          categoryPercentage: .8,
        }],
        yAxes: [{
          gridLines: { color: 'rgba(255, 110, 0, .25)' },
          ticks: {
            min, max,
            callback: Util.getRateStr
          }
        },{
          position: 'right',
          gridLines: { display: false },
          ticks: {
            min, max,
            callback: Util.getRateStr
          }
        }]
      }
    };

    console.log(cData, cOptions);
    new Chart(ctx, {
      type:    'bar',
      data:    cData,
      options: cOptions,
    });
  }

  render() {
    const { w, h } = Util.getCanvasSize();

    return (
      <div className="graph-wrap">
        <canvas ref="graph" width={w} height={h}></canvas>
      </div>
    );
  }
}

module.exports = Graph;
