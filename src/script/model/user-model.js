'use strict';

module.exports = UserModel;

var instance = null;
function UserModel() {
  this.data = {
    isFirstTime: true,
    totalIdx:    0,
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
  updateTotalIdx: function() {
    var cur = this.get('totalIdx')|0;
    this.set('totalIdx', cur + 1);
  }
};
