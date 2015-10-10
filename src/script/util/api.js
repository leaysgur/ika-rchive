'use strict';
let axios = require('axios');
let Const = require('../const');

class API {
  constructor() {
    axios.interceptors.request.use((conf) => {
      // pointer-events: none
      return conf;
    });
    axios.interceptors.response.use((res) => {
      // pointer-events: auto
      return res;
    });
  }

  fetchRuleAndStages() {
    let url = Const.ENDPOINT.RULE_STAGE;
    return this._fetch(url);
  }

  _fetch(url) {
    return axios.get(url);
  }
}

module.exports = (new API());
