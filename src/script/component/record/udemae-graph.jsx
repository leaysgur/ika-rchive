const React = require('react');

const Util = require('../../util');
const Chart = Util.getChartClass();
const {
  RULE,
} = require('../../const');

class UdemaeGraph extends React.Component {
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
      // 片方はLineチャートだが見えないので関係ない
      datasets: [{
        type:  'bar',
        data:  data,
        label: null,
        backgroundColor: backgroundColor,
      }, {
        type:  'line',
        data:  data,
        label: null,
      }]
    };

    // 左右の目盛りを同一にするためには、目盛りを固定する必要がある
    const min = Util.getUdemaeScaleMin(data);
    const max = Util.getUdemaeScaleMax(data);

    const cOptions = {
      tooltips: {
        callbacks: {
          title: () => { return ''; },
          label: (item) => { return tooltip[item.index]; }
        }
      },
      scales: {
        xAxes: [{
          barPercentage: .8,
          categoryPercentage: 1,
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
        <h3 className="h3 ft-ika">ウデマエのスイイ</h3>
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

module.exports = UdemaeGraph;
