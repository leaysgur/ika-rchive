'use strict';
var Const = require('../const');

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
    this._fetch();
  },
  _fetch: function() {
    var data = localStorage.getItem('IA_RECORD');
    if (data !== null) {
      this.data = JSON.parse(data);
    }
  },
  _save: function() {
    localStorage.setItem('IA_RECORD', JSON.stringify(this.data));
  },
  set: function(record) {
    this.data.push(record);
    // data.lengthはLIMITを超えないし、超えたら先頭が消える
    while (this.data.length > Const.RECORD_LIMIT) {
      this.data.shift();
    }
    this._save();
  },
  remove: function(idx) {
    this.data.splice(idx, 1);
    this._save();
  }
};
