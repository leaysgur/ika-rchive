const React = require('react');
const Chart = require('chart.js');
Chart.defaults.global.defaultFontColor = '#fff';

const Util = require('../../util');

class Graph extends React.Component {
  componentDidMount() {
    const ctx = this.refs.graph.getContext('2d');
    const {
      labels,
      data, backgroundColor,
    } = this.props;

    const cData = {
      labels: labels,
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

    const min = Math.floor(Math.min.apply(null, data.filter(Boolean)) / 10) * 10;
    const max = Math.ceil(Math.max.apply(null, data.filter(Boolean)) / 10) * 10;

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
          barPercentage: 1.2,
          categoryPercentage: .8,
          ticks: {
            autoSkip: false,
          }
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
