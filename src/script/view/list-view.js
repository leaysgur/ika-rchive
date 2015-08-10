'use strict';
var Vue   = require('vue');
var RecordModel = require('../model/record-model').getInstance();

module.exports = Vue.extend({
  el: function() { return '#js-view-list'; },
  data: function() {
    return {
      records: RecordModel.data
    };
  }
});
