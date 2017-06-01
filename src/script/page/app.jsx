const React = require('react');
const {
  HashRouter,
  Route,
  Redirect,
  Switch,
  NavLink,
} = require('react-router-dom');

const RecordPage = require('./record.jsx');
const StatPage   = require('./stat.jsx');
const InputPage  = require('./input.jsx');
const OthersPage = require('./others.jsx');

const App = () => {
  return (
    <HashRouter hashType="hashbang">
      <div>
        <h1 className="title ft-ika">ウデマエア-カイブ<strong>2</strong></h1>
        <ul className="tab ft-ika">
          <li className="tab-item">
            <NavLink to="/record" activeClassName="is-active">キロク</NavLink>
          </li>
          <li className="tab-item">
            <NavLink to="/stat" activeClassName="is-active">セイセキ</NavLink>
          </li>
          <li className="tab-item">
            <NavLink to="/input" activeClassName="is-active">トウロク</NavLink>
          </li>
          <li className="tab-item">
            <NavLink to="/others" activeClassName="is-active">ソノタ</NavLink>
          </li>
        </ul>

        <Switch>
          <Route path="/record" component={RecordPage} />
          <Route exact path="/stat" component={StatPage} />
          <Route exact path="/input" component={InputPage} />
          <Route exact path="/others" component={OthersPage} />
          <Redirect from="*" to="/others" />
        </Switch>
      </div>
    </HashRouter>
  );
};

module.exports = App;
