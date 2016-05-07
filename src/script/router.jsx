const React = require('react'); // eslint-disable-line no-unused-vars
const {
  Router,
  Route,
  IndexRoute,
  hashHistory,
} = require('react-router');
const Master = require('./page/_master');
const Graph  = require('./page/graph');
const User   = require('./page/user');

module.exports = (
  <Router history={hashHistory}>
    <Route path="/" component={Master}>
      <IndexRoute         components={{ Main: Graph }} />
      <Route path="graph" components={{ Main: Graph }} />
      <Route path="user"  components={{ Main: User }} />
    </Route>
  </Router>
);
