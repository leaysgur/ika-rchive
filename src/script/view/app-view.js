'use strict';

// var UserModel = {
//   showApp: 1
// };

module.exports = {
  el: '#js-view-app',
  data: {
    // showApp: UserModel.showApp
    activePane: 'record'
  },
  methods: {
    showPane: function(willActivePane) {
      this.activePane = willActivePane;
    }
  }
};
