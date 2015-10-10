'use strict';
let BaseModel = require('./_base');

class UserModel extends BaseModel {
  constructor() {
    super('IA_USER', {
      migiratedVersions: [],
      isFirstTime:       true,
      totalIdx:          0,
      bestRate:          null,
      lastRank:          null
    });
  }

  migrate(ver) {
    if (this.isMigrated(ver)) { return; }
    let versions = this.get('migiratedVersions') || [];
    versions.push(ver);
    this.set('migiratedVersions', versions);
  }

  isMigrated(ver) {
    let versions = this.get('migiratedVersions') || [];
    return versions.indexOf(ver) === -1 ? false : true;
  }

  updateBestRate(rate) {
    rate = rate|0;
    let cur = this.get('bestRate')|0;
    if (rate > cur) {
      this.set('bestRate', rate);
    }
  }

  updateTotalIdx() {
    let cur = this.get('totalIdx')|0;
    this.set('totalIdx', cur + 1);
  }

  clearTotalData() {
    this.set('bestRate', 0);
    this.set('totalIdx', 0);
  }

  clearAllData() { this._clear(); }
}

let instance = null;
module.exports = {
  getInstance: () => {
    if (instance === null) {
      instance = new UserModel();
    }

    return instance;
  }
};
