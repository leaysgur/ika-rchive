'use strict';

var UserModel = require('../model/user-model').getInstance();

module.exports = {
  el: '#js-view-app',
  data: {
    isFirstTime: UserModel.get('isFirstTime'),
    activePane: 'record'
  },
  methods: {
    showPane: function(willActivePane) {
      this.activePane = willActivePane;
    },
    onClickOk: function() {
      this.isFirstTime = false;
      UserModel.set('isFirstTime', false);
    }
  }
};
