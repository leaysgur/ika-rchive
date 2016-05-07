'use strict';

class Eve {
  constructor() {
    this.events = {};

    window.addEventListener('message', this, false);
  }

  handleEvent(ev) {
    let { action, data } = ev.data;
    if (action in this.events === false) { return; }

    this.events[action].forEach((fn) => {
      fn(data);
    });
  }

  on(action, fn) {
    if (action in this.events === false) {
      this.events[action] = [];
    }
    this.events[action].push(fn);
  }

  emit(action, data) {
    window.postMessage({ action, data }, location.origin);
  }
}

module.exports = (new Eve());
