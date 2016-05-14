const React = require('react');
const { Link } = require('react-router');

const MasterPage = ({ children }) => {
  return (
    <div>
      <h1 className="title ft-ika">ウデマエア-カイブ</h1>
      <ul className="tab ft-ika">
        <li className="tab-item">
          <Link to="record" activeClassName="is-active">キロク</Link>
        </li>
        <li className="tab-item">
          <Link to="stat" activeClassName="is-active">セイセキ</Link>
        </li>
        <li className="tab-item">
          <Link to="input" activeClassName="is-active">トウロク</Link>
        </li>
        <li className="tab-item">
          <Link to="others" activeClassName="is-active">ソノタ</Link>
        </li>
      </ul>
      {children}
    </div>
  );
};

MasterPage.propTypes = {
  children: React.PropTypes.element.isRequired,
};

module.exports = MasterPage;
