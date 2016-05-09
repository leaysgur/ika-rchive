const BaseModel = require('./_base');

class UserModel extends BaseModel {
  constructor() {
    super('IA_USER', {
      isFirstTime:       true,
      totalIdx:          0,
      bestRate:          null,
    });
  }

  updateBestRate(rate) {
    rate = rate|0;
    const cur = this.get('bestRate')|0;
    if (rate > cur) {
      this.set('bestRate', rate);
    }
  }

  updateTotalIdx() {
    const cur = this.get('totalIdx')|0;
    this.set('totalIdx', cur + 1);
  }

  clearBestRate() {
    this.set('bestRate', 0);
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
