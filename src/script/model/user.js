const BaseModel = require('./_base');

class UserModel extends BaseModel {
  constructor() {
    super('IA_USER', {
      isFirstTime: true,
      totalIdx:    0,
      bestRate:    0,
    });
  }

  setRecord(rate) {
    rate = rate|0;

    const curIdx  = this.get('totalIdx')|0;
    const curRate = this.get('bestRate')|0;

    if (rate > curRate) {
      this.set({
        bestRate: rate,
        totalIdx: curIdx + 1
      });
    } else {
      this.set('totalIdx', curIdx + 1);
    }
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
