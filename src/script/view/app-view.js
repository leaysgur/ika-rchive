'use strict';
var Eve   = require('../eve');
var Const = require('../const');
var UserModel = require('../model/user-model').getInstance();

module.exports = {
  el: '#js-view-app',
  data: {
    isFirstTime: UserModel.get('isFirstTime'),
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
    }
  }
};
