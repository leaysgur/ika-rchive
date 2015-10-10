'use strict';
let Eve   = require('../util/eve');
let Const = require('../const');
let UserModel   = require('../model/user-model').getInstance();
let RecordModel = require('../model/record-model').getInstance();

module.exports = {
  el: '#js-view-app',
  data: {
    isFirstTime: UserModel.get('isFirstTime'),
    limit:       Const.RECORD_LIMIT,
    activePane:  UserModel.get('lastPane') || 'record'
  },
  methods: {
    showPane: function(willActivePane) {
      this.activePane = willActivePane;
      Eve.emit('showPane', willActivePane);
      UserModel.set('lastPane', willActivePane);
    },
    onClickOk: function() {
      this.isFirstTime = false;
      UserModel.set('isFirstTime', false);
    },
    onClickResetBestRate: (ev) => {
      ev.preventDefault();
      if (window.confirm('変更したデータは元に戻せません。\n本当に最高ウデマエをリセットしますか？')) {
        UserModel.clearBestRate();
        location.reload();
      }
    },
    onClickRestart: (ev) => {
      ev.preventDefault();
      if (window.confirm('削除したデータは元に戻せません。\n本当に全削除しますか？')) {
        UserModel.clearAllData();
        RecordModel.clearAllData();
        location.reload();
      }
    }
  }
};
