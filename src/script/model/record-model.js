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
  // といいつつ修正するコ
  _validate: function(record) {
    var isWin = (record.result|0) % 2;
    if (isWin) { record.missmatch = false; }
    return record;
  },
  set: function(record) {
    // 登録日はココでいれる
    record.createdAt = Date.now();

    // リスト追加
    this.data.push(this._validate(record));

    // data.lengthはLIMITを超えないし、超えたら先頭が消える
    while (this.data.length > Const.RECORD_LIMIT) {
      this.data.shift();
    }
    this._save();
  },
  get: function(idx) {
    return this.data[idx];
  },
  update: function(idx, record) {
    this.data.splice(idx, 1, this._validate(record));
    this._save();
  },
  remove: function(idx) {
    this.data.splice(idx, 1);
    this._save();
  }
};
