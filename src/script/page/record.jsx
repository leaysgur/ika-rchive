const React = require('react');
const {
  Route,
  Redirect,
  Switch,
} = require('react-router-dom');

const GraphPage  = require('./record/graph.jsx');
const ListPage   = require('./record/list.jsx');

class RecordPage extends React.Component {
  render() {
    return (
      <div className="view-record">
        <Switch>
          <Route exact path="/record/graph" component={GraphPage} />
          <Route exact path="/record/list"  component={ListPage} />
          <Redirect from="*" to="/record/graph" />
        </Switch>
      </div>
    );
  }
}

module.exports = RecordPage;
