const React = require('react');
const Chart = require('chart.js');
const assign = require('object-assign');

const Util = require('../../util');
const {
  RULE_COLOR,
} = require('../../const');

Chart.defaults.global.responsive = false;
Chart.defaults.global.events = ['mousemove', 'touchstart'];
Chart.defaults.global.legend.display = false;
Chart.defaults.global.tooltips.callbacks.title = () => {
  return '';
};
Chart.defaults.global.tooltips.callbacks.label = (item) => {
  return Util.getRateStr(item.yLabel);
};
assign(Chart.defaults.bar.scales.xAxes[0], {
  display: false,
  barPercentage: .8,
  categoryPercentage: 1,
});
assign(Chart.defaults.bar.scales.yAxes[0], {
  ticks: {
    callback: Util.getRateStr
  }
});

function toGraphData(records) {
  const ret = {
    labels:          [],
    data:            [],
    backgroundColor: []
  };
  records.forEach((item, idx) => {
    ret.labels.push(idx + 1);
    ret.data.push(item.rate);
    ret.backgroundColor.push(RULE_COLOR[item.rule]);
  });

  return ret;
}

class Graph extends React.Component {
  componentDidMount() {
    const { records } = this.props;
    if (records.length === 0) { return; }

    const ctx = this.refs.graph.getContext('2d');
    const {
      labels,
      data, backgroundColor,
    } = toGraphData(records);
    const cData = {
      labels: labels,
      datasets: [{
        data: data,
        label: null,
        backgroundColor: backgroundColor,
      }]
    };
    const cOptions = {
    };

    console.log(cData, cOptions);
    new Chart(ctx, {
      type:    'bar',
      data:    cData,
      options: cOptions,
    });
  }

  render() {
    const { records } = this.props;

    return (
      <div className="graph-wrap">
        {
          records.length === 0
            ? <div className="graph-cover">
                <p className="wrap">まだデータが<span className="ft-ika">トウロク</span>されてないぞ！</p>
              </div>
            : null
        }
        <canvas ref="graph" width="1800" height="270"></canvas>
      </div>
    );
  }
}

module.exports = Graph;
