const React = require('react');

const {
  RULE,
  STAGE,
  RESULT,
  RECORD_LIMIT,
} = require('../../const');
const Util = require('../../util');


class List extends React.Component {
  render() {
    const {
      records,
      modifyRecord,
      removeRecord,
    } = this.props;

    return (
      <ul className="record-list wrap">
        {records.map((item, idx) => {
          const vIdx = records.length - idx;
          return (
            <li className="record-list-item" key={idx}>
              <div>{vIdx}/{RECORD_LIMIT}戦目 - {Util.formatDate(item.createdAt)}</div>
              <hr className="record-list-item-spacer" />
              <div>
                <span className={`fc-rule-${item.rule}`}>{RULE[item.rule]}</span> in {STAGE[item.stage]}
              </div>
              <div>
                {RESULT[item.result]} <span className="ft-ika">-</span> {Util.getRateStr(item.rate)} / {item.tagmatch ? 'タッグマッチ' : '野良ガチマッチ'}
              </div>
              <div>
                {item.missmatch ? '(マッチング事故)' : ''}
              </div>
              <hr className="record-list-item-spacer" />
              <div className="ctrl-wrap">
                このキロクを
                <span className="mod-mark" onTouchTap={(ev) => { modifyRecord(ev, item, vIdx - 1); }}>[シュウセイ]</span>
                <span className="del-mark" onTouchTap={(ev) => { removeRecord(ev, vIdx - 1); }}>[サクジョ]</span>
              </div>
            </li>
          );
        })}
      </ul>
    );
  }
}

module.exports = List;
