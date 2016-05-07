const React = require('react'); // eslint-disable-line no-unused-vars
const RR = require('react-router');

const {
  Router,
  Route,
  IndexRoute,
  hashHistory,
} = RR;

const App = (props) => {
  const { Main } = props;

  return (
    <div>
      <h1>App</h1>
      <div>{Main}</div>
    </div>
  );
};

const Graph = () => {
  return (
    <div>Graph</div>
  );
};
const User = () => {
  return (
    <div>User</div>
  );
};

module.exports = (
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute         components={{ Main: Graph }} />
      <Route path="graph" components={{ Main: Graph }} />
      <Route path="user"  components={{ Main: User }} />
    </Route>
  </Router>
);
