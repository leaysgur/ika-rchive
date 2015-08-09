'use strict';
module.exports = RecordModel;

function RecordModel() {
  this._data = [];

  this._init();
}

RecordModel.prototype = {
  constructor: RecordModel,
  _init: function() {
    this.fetch();
  },
  fetch: function() {
    this._data = [
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
  },
  toChartData: function() {
    return this._data.map(function(item) {
      return item.rate;
    });
  },
  toChartLabel: function() {
    return this._data.map(function(item) {
      return item._id;
    });
  }
};
