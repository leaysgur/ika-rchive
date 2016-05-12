const React = require('react');

const ModPopup = ({
  modItem,
  modIdx,
  onModify,
}) => {
  return (
    <div>
      <ul className="wrap mod-wrap view-input">
        <li>
          {modIdx}: {JSON.stringify(modItem)}
        </li>
        <li>
          <div className="ctrl-wrap">
            <span className="mod-mark" onTouchTap={onModify}>[キャンセル]</span>
          </div>
        </li>
      </ul>
    </div>
  );
};

module.exports = ModPopup;
