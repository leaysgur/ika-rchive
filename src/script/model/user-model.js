'use strict';
module.exports = UserModel;

var instance = null;
function UserModel() {
  this.data = {
    migiratedVersions: [],
    isFirstTime:       true,
    totalIdx:          0,
    bestRate:          null,
    lastRank:          null
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
  },
  _fetch: function() {
    var data = localStorage.getItem('IA_USER');
    if (data !== null) {
      this.data = JSON.parse(data);
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
  clear: function() {
    localStorage.removeItem('IA_USER');
  },
  migrate: function(ver) {
    if (this.isMigrated(ver)) { return; }
    var versions = this.get('migiratedVersions') || [];
    versions.push(ver);
    this.set('migiratedVersions', versions);
  },
  isMigrated: function(ver) {
    var versions = this.get('migiratedVersions') || [];
    return versions.indexOf(ver) === -1 ? false : true;
  },
  updateBestRate: function(rate) {
    rate = rate|0;
    var cur = this.get('bestRate')|0;
    if (rate > cur) {
      this.set('bestRate', rate);
    }
  },
  updateTotalIdx: function() {
    var cur = this.get('totalIdx')|0;
    this.set('totalIdx', cur + 1);
  }
};
