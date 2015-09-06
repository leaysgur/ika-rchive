'use strict';
var Eve   = require('../eve');
var Const = require('../const');
var UserModel   = require('../model/user-model').getInstance();
var RecordModel = require('../model/record-model').getInstance();

module.exports = {
  el: '#js-view-app',
  data: {
    isFirstTime: UserModel.get('isFirstTime'),
    appVersion: Const.APP_VERSION,
    limit:      Const.RECORD_LIMIT,
    activePane: 'record'
  },
  methods: {
    showPane: function(willActivePane) {
      this.activePane = willActivePane;
      Eve.emit('showPane', willActivePane);
    },
    onClickOk: function() {
      this.isFirstTime = false;
      UserModel.set('isFirstTime', false);
    },
    onClickRestart: function(ev) {
      ev.preventDefault();
      if (window.confirm('削除したデータは元に戻せません。\n本当に全削除しますか？')) {
        UserModel.clear();
        RecordModel.clear();
        location.reload();
      }
    }
  }
};
