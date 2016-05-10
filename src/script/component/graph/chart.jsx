const React = require('react');
const Chartjs = require('chart.js');
Chartjs.defaults.global.responsive = false;
// Chartjs.defaults.bar.categoryPercentage = 0.5;
// Chartjs.defaults.bar.barPercentage = 1.0;
Chartjs.defaults.bar.scales.xAxes = [{
  barPercentage: 0.8,
  categoryPercentage: 1
}];

// const Util = require('../../util');
const { RULE_COLOR, } = require('../../const');

class Chart extends React.Component {
  componentDidMount() {
    const { records } = this.props;
    if (records.length === 0) { return; }

    const ctx = this.refs.graph.getContext('2d');
    const data = {
      labels: records.map((_r, idx) => { return idx++; }),
      datasets: [{
        data: records.map((r) => {
          return r.rate;
        }),
        label: '',
        backgroundColor: records.map((r) => { return RULE_COLOR[r.rule]; })
      }]
    };
    const options = {
    };

    console.log(data, options);
    new Chartjs(ctx, {
      type: 'bar',
      data: data,
      options: options
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
        <canvas ref="graph" width="1600" height="400"></canvas>
      </div>
    );
  }
}

module.exports = Chart;
