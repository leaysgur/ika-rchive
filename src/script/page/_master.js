const React = require('react'); // eslint-disable-line no-unused-vars
const { Link } = require('react-router');

const MasterPage = ({ Main }) => {
  return (
    <div>
      <h1 className="ft-ika">ウデマエア-カイブ</h1>
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
      {Main}
    </div>
  );
};

MasterPage.propTypes = {
  Main: React.PropTypes.element.isRequired,
};

module.exports = MasterPage;
