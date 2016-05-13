const React = require('react');
const Chart = require('chart.js');
Chart.defaults.global.defaultFontColor = '#fff';

const Util = require('../../util');
const {
  RULE,
  RATE_SCALE_GAP,
} = require('../../const');

class KDGraph extends React.Component {
  constructor() {
    super();

    this.chart = null;
  }

  componentDidMount() {
    const ctx = this.refs.graph.getContext('2d');
    const {
      labels,
      data, backgroundColor,
      tooltip,
    } = this.props;

    const cData = {
      labels: labels,
      // 右目盛りのために同じデータを2つ渡す
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

    // 左右の目盛りを同一にするためには、目盛りを固定する必要がある
    const min = Math.floor(Math.min.apply(null, data.filter(Boolean)) / 10) * 10 - RATE_SCALE_GAP;
    const max = Math.ceil(Math.max.apply(null, data.filter(Boolean)) / 10) * 10 + RATE_SCALE_GAP;

    const cOptions = {
      responsive: false,
      events: ['mousemove', 'touchstart'],
      legend: { display: false },
      tooltips: {
        callbacks: {
          title: () => { return ''; },
          label: (item) => { return tooltip[item.index]; }
        }
      },
      scales: {
        xAxes: [{
          // カテゴリに対してバーがはみ出るようにすることで、
          // 2本のバーを1本に見せかける
          barPercentage: 1.2,
          categoryPercentage: .8,
          ticks: { autoSkip: false, }
        }],
        yAxes: [{
          gridLines: { color: 'rgba(255, 110, 0, .25)' },
          ticks: {
            min, max,
            callback: Util.getRateStr,
            autoSkip: false,
          }
        },{
          position: 'right',
          gridLines: { display: false },
          ticks: {
            min, max,
            callback: Util.getRateStr,
            autoSkip: false,
          }
        }]
      }
    };

    this.chart = new Chart(ctx, {
      type:    'bar',
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
        <h3 className="h3 ft-ika">キル・デス</h3>
        <div className="graph-legend">
          {Object.keys(RULE).map((key, idx) => {
            return (
              <span key={idx} className={`fc-rule-${key}`}>
                ■<span className="ft-ika">{RULE[key]}</span>
              </span>
            );
          })}
        </div>
        <div className="graph-wrap">
          <canvas ref="graph" width={w} height={h}></canvas>
        </div>
      </div>
    );
  }
}

module.exports = KDGraph;
