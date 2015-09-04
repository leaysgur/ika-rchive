'use strict';
var Util = require('../util');
var RecordModel = require('./record-model').getInstance();

module.exports = UserModel;

var instance = null;
function UserModel() {
  this.data = {
    isFirstTime: true,
    totalIdx:    0,
    bestRate:    null,
    lastRank:    null
  };

  this._init();
}

UserModel.getInstance = function() {
  if (instance === null) {
    instance = new UserModel();
  }
  return instance;
};

UserModel.prototype = {
  constructor: UserModel,
  _init: function() {
    this._fetch();
    this._migrate();
  },
  _fetch: function() {
    var data = localStorage.getItem('IA_USER');
    if (data !== null) {
      this.data = JSON.parse(data);
    }
  },
  _migrate: function() {
    if (this.get('totalIdx') === undefined) {
      this.set('totalIdx', RecordModel.data.length);
    }
  },
  _save: function() {
    localStorage.setItem('IA_USER', JSON.stringify(this.data));
  },
  get: function(prop) {
    return this.data[prop];
  },
  set: function(prop, value) {
    if (typeof prop === 'object' && value === undefined) {
      for (var key in prop) {
        this.data[key] = prop[key];
      }
    } else {
      this.data[prop] = value;
    }

    this._save();
  },
  updateBestRate: function(rate) {
    rate = rate|0;
    var cur = this.get('bestRate')|0;
    if (rate > cur) {
      this.set('bestRate', Util.getRateStr(rate));
    }
  },
  updateTotalIdx: function() {
    var cur = this.get('totalIdx')|0;
    this.set('totalIdx', cur + 1);
  }
};
