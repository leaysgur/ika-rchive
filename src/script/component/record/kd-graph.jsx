const React = require('react');

const Util = require('../../util');
const Chart = Util.getChartClass();

class KDGraph extends React.Component {
  constructor() {
    super();

    this.chart = null;
  }

  componentDidMount() {
    const ctx = this.refs.graph.getContext('2d');
    const {
      labels,
      data,
      tooltip,
      scaleMax, scaleMin,
    } = this.props;

    const cData = {
      labels: labels,
      datasets: [{
        type:  'line',
        data:  data,
        label: null,
        borderColor: '#FF6E00',
        borderWidth: 1,
        pointRadius: 3,
      }, {
        type:  'line',
        data:  data,
        label: null,
        borderWidth: 0,
        pointRadius: 0,
      }]
    };

    const cOptions = {
      tooltips: {
        callbacks: {
          title: () => { return ''; },
          label: (item) => { return tooltip[item.index]; }
        }
      },
      scales: {
        xAxes: [{
          ticks: { autoSkip: false, }
        }],
        yAxes: [{
          gridLines: { color: 'rgba(255, 110, 0, .25)' },
          ticks: {
            min: scaleMin,
            max: scaleMax,
            callback: (ratio) => {
              return ` ${('0'+ratio).slice(-2)}.0`;
            },
            stepSize: 1,
          }
        },{
          position: 'right',
          gridLines: { display: false },
          ticks: {
            min: scaleMin,
            max: scaleMax,
            callback: (ratio) => {
              return ` ${('0'+ratio).slice(-2)}.0`;
            },
            stepSize: 1,
          }
        }]
      }
    };

    this.chart = new Chart(ctx, {
      data:    cData,
      options: cOptions,
    });
  }

  componentWillUnmount() {
    this.chart.destroy();
    this.chart = null;
  }

  render() {
    const { w, h } = Util.getCanvasSize();

    return (
      <div className="graph">
        <h3 className="h3 ft-ika">キル・デスのヒリツ</h3>
        <div className="graph-wrap">
          <canvas ref="graph" width={w} height={h}></canvas>
        </div>
      </div>
    );
  }
}

module.exports = KDGraph;
