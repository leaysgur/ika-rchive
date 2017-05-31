const React = require('react');
const { Link } = require('react-router');

const Switcher = ({
  isGraph, isList,
}) => {
  return (
    <div className="switcher">
      {isGraph
        ? <span className="ft-ika">グラフ</span>
        : <Link to="record/graph"><span className="ft-ika">グラフ</span></Link>
      }
      &nbsp;|&nbsp;
      {isList
        ? <span className="ft-ika">リスト</span>
        : <Link to="record/list"><span className="ft-ika">リスト</span></Link>
      }
    </div>
  );
};

Switcher.propTypes = {
  isGraph: PropTypes.bool.isRequired,
  isList:  PropTypes.bool.isRequired,
};

module.exports = Switcher;
