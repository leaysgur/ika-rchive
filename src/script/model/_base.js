// @flow
'use strict';

class BaseModel {
  key: string;
  data: Object;

  constructor(key: string, def: Object = {}) {
    if (!key) { throw new Error('NO KEY!'); }
    this.key  = key;
    this.data = def;

    this._init();
  }

  _init(): void {
    this._fetch();
  }

  _fetch(): void {
    const _data: string = localStorage.getItem(this.key) || '';
    if (_data) {
      const data: any = JSON.parse(_data);
      if (Array.isArray(data)) {
        this.data['items'] = data;
      } else {
        this.data = data;
      }
    }
  }

  _save(): void {
    localStorage.setItem(this.key, JSON.stringify(this.data));
  }

  _clear(): void {
    localStorage.removeItem(this.key);
  }

  set(prop: string | Object, value: ?any) {
    if (typeof prop === 'object' && value === undefined) {
      for (let key in prop) {
        this.data[key] = prop[key];
      }
    } else {
      this.data[prop] = value;
    }

    this._save();
  }

  get(key: string): any {
    return this.data[key];
  }
}

module.exports = BaseModel;
