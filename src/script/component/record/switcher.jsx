const React = require('react');
const PropTypes = require('prop-types');
const { NavLink } = require('react-router-dom');

const Switcher = ({
  isGraph, isList,
}) => {
  return (
    <div className="switcher">
      {isGraph
        ? <span className="ft-ika">グラフ</span>
        : <NavLink to="/record/graph"><span className="ft-ika">グラフ</span></NavLink>
      }
      &nbsp;|&nbsp;
      {isList
        ? <span className="ft-ika">リスト</span>
        : <NavLink to="/record/list"><span className="ft-ika">リスト</span></NavLink>
      }
    </div>
  );
};

Switcher.propTypes = {
  isGraph: PropTypes.bool.isRequired,
  isList:  PropTypes.bool.isRequired,
};

module.exports = Switcher;
