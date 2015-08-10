'use strict';
module.exports = RecordModel;

var instance = null;
function RecordModel() {
  this.data = [];

  this._init();
}

RecordModel.getInstance = function() {
  if (instance === null) {
    instance = new RecordModel();
  }
  return instance;
};

RecordModel.prototype = {
  constructor: RecordModel,
  _init: function() {
    this.fetch();
  },
  fetch: function() {
    var data = localStorage.getItem('IA_RECORD');
    if (data !== null) {
      this.data = JSON.parse(data);
    }
  },
  save: function() {
    localStorage.setItem('IA_RECORD', JSON.stringify(this.data));
  },
  set: function(record) {
    var latestId = 0;
    if (this.data.length) {
      latestId = this.data.reduce(function(item, cur) {
        return (item._id < cur._id) ? cur : item;
      })._id;
    }

    record._id = latestId + 1;
    this.data.push(record);
    this.save();
  },
  remove: function(idx) {
    this.data.splice(idx, 1);
    this.save();
  }
};
