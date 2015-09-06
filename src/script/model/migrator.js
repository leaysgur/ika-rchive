'use strict';
var Util = require('../util');
var RecordModel = require('./record-model').getInstance();
var UserModel   = require('./user-model').getInstance();

/**
 * v1.11.0 -> 1.12.0のタイミング
 *
 * [通算バトル数を集計するように]
 * - 現状のレコードの数は今までバトルしてるはずなので、それを設定する
 * [自己ベストもずっと保持するように]
 * - いままで文字列(A+30 とか)だったのを、数値に変更
 *
 */
if (!UserModel.isMigrated('1.12.0')) {
    if (UserModel.get('totalIdx') === undefined) {
      UserModel.set('totalIdx', RecordModel.data.length);
    }
    var bestRate = UserModel.get('bestRate');
    if (isNaN(parseInt(bestRate))) {
      UserModel.set('bestRate', Util.getRateFromRateStr(bestRate));
    }
    UserModel.migrate('1.12.0');
}
