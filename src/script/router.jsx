const React = require('react'); // eslint-disable-line no-unused-vars
const {
  Router,
  Route,
  IndexRedirect,
  hashHistory,
} = require('react-router');

const Master = require('./page/_master.jsx');
const RecordPage = require('./page/record.jsx');
const GraphPage  = require('./page/record/graph.jsx');
const ListPage   = require('./page/record/list.jsx');
const StatPage   = require('./page/stat.jsx');
const InputPage  = require('./page/input.jsx');
const OthersPage = require('./page/others.jsx');

module.exports = (
  <Router history={hashHistory}>
    <Route path="/" component={Master}>
      <IndexRedirect to="record" />
      <Route path="record" component={RecordPage}>
        <IndexRedirect to="graph" />
        <Route path="graph" component={GraphPage} />
        <Route path="list"  component={ListPage} />
      </Route>
      <Route path="stat"   component={StatPage} />
      <Route path="input"  component={InputPage} />
      <Route path="others" component={OthersPage} />
    </Route>
  </Router>
);
