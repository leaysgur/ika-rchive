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
    if (data === null) {
      this.data = [
        {
          _id: 1,
          result: 1,
          rule: 2,
          stage: 8,
          rate: 585
        },
        {
          _id: 2,
          result: 1,
          rule: 2,
          stage: 8,
          rate: 595
        },
        {
          _id: 3,
          result: 2,
          rule: 1,
          stage: 1,
          rate: 588
        },
        {
          _id: 4,
          result: 2,
          rule: 1,
          stage: 1,
          rate: 578
        },
        {
          _id: 5,
          result: 2,
          rule: 1,
          stage: 1,
          rate: 566
        },
      ];
    } else {
      this.data = data;
    }
  },
  save: function() {
    localStorage.setItem('IA_RECORD', JSON.stringify(this.data));
  },
  set: function(record) {
    var latestId = this.data.reduce(function(item, cur) {
      return (item._id < cur._id) ? cur : item;
    })._id;

    record._id = latestId + 1;
    this.data.push(record);
  }
};
