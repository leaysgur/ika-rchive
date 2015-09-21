'use strict';
let Eve   = require('../eve');
let Const = require('../const');
let UserModel   = require('../model/user-model').getInstance();
let RecordModel = require('../model/record-model').getInstance();

module.exports = {
  el: '#js-view-app',
  data: {
    isFirstTime: UserModel.get('isFirstTime'),
    limit:       Const.RECORD_LIMIT,
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
