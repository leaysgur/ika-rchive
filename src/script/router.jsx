const React = require('react'); // eslint-disable-line no-unused-vars
const {
  Router,
  Route,
  IndexRedirect,
  hashHistory,
} = require('react-router');

const Master = require('./page/_master');
const GraphPage  = require('./page/graph');
const StatPage   = require('./page/stat');
const InputPage  = require('./page/input');
const OthersPage = require('./page/others');

module.exports = (
  <Router history={hashHistory}>
    <Route path="/" component={Master}>
      <IndexRedirect to="graph" />
      <Route path="graph"  components={{ Main: GraphPage }} />
      <Route path="stat"   components={{ Main: StatPage }} />
      <Route path="input"  components={{ Main: InputPage }} />
      <Route path="others" components={{ Main: OthersPage }} />
    </Route>
  </Router>
);
