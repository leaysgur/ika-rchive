const React = require('react');
const { NavLink } = require('react-router-dom');

const Switcher = () => {
  return (
    <div className="switcher">
      <NavLink to="/record/graph" activeClassName="is-active">
        <span className="ft-ika">グラフ</span>
      </NavLink>
      &nbsp;|&nbsp;
      <NavLink to="/record/list" activeClassName="is-active">
        <span className="ft-ika">リスト</span>
      </NavLink>
    </div>
  );
};

module.exports = Switcher;
