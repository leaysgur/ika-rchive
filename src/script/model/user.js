// @flow
const BaseModel = require('./_base');

class UserModel extends BaseModel {
  isFirstTime: boolean;
  totalIdx:    number;
  bestRate:    number;

  constructor() {
    super('IA_USER', {
      isFirstTime: true,
      totalIdx:    0,
      bestRate:    0,
    });
  }

  setRecord(rate: number): void {
    const curIdx: number = this.get('totalIdx')|0;
    this.set('totalIdx', curIdx + 1);
    this.updateBestRate(rate);
  }

  updateBestRate(rate: number): void {
    const curRate: number = this.get('bestRate')|0;
    if (rate > curRate) {
      this.set('bestRate', rate);
    }
  }

  clearBestRate(): void {
    this.set('bestRate', 0);
  }

  clearAllData(): void { this._clear(); }
}

let instance: ?UserModel = null;
module.exports = {
  getInstance: (): ?UserModel => {
    if (instance === null) {
      instance = new UserModel();
    }

    return instance;
  }
};
