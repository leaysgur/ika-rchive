const React = require('react'); // eslint-disable-line no-unused-vars
const {
  HashRouter,
  Route,
  Redirect,
  Switch,
} = require('react-router-dom');

const Master = require('./page/_master.jsx');
const RecordPage = require('./page/record.jsx');
const StatPage   = require('./page/stat.jsx');
const InputPage  = require('./page/input.jsx');
const OthersPage = require('./page/others.jsx');

module.exports = (
  <HashRouter>
    <Master>
      <Switch>
        <Route path="/record" component={RecordPage} />
        <Route exact path="/stat"   component={StatPage} />
        <Route exact path="/input"  component={InputPage} />
        <Route exact path="/others" component={OthersPage} />
        <Redirect from="*" to="/stat" />
      </Switch>
    </Master>
  </HashRouter>
);
