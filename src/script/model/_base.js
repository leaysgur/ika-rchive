'use strict';

class BaseModel {
  constructor(key, def) {
    this.key  = key || new Error('NO KEY');
    this.data = def || {};

    this._init();
  }

  _init() {
    this._fetch();
  }

  _fetch() {
    let data = localStorage.getItem(this.key);
    if (data !== null) {
      data = JSON.parse(data);
      if (Array.isArray(data)) {
        this.data['items'] = data;
      } else {
        this.data = data;
      }
    }
  }

  _save() {
    localStorage.setItem(this.key, JSON.stringify(this.data));
  }

  clear() {
    localStorage.removeItem(this.key);
  }

  set(prop, value) {
    if (typeof prop === 'object' && value === undefined) {
      for (let key in prop) {
        this.data[key] = prop[key];
      }
    } else {
      this.data[prop] = value;
    }

    this._save();
  }

  get(key) {
    return this.data[key];
  }
}

module.exports = BaseModel;
