"use strict";

exports.__esModule = true;

var _rockLibApi = require("../../../rock/lib/api");

var accounts = function accounts() {
  if (_rockLibApi.api._ && _rockLibApi.api._.baseURL && REST2DDP) {
    var _headers;

    REST2DDP.publish("accounts", {
      collectionName: "accounts",
      restUrl: _rockLibApi.api._.baseURL + "api/" + _rockLibApi.endpoints.accounts,
      jsonPath: "*",
      pollInterval: 10000,
      headers: (_headers = {}, _headers[_rockLibApi.api._.tokenName] = _rockLibApi.api._.token, _headers["Content-Type"] = "application/json", _headers)
    });

    return;
  }
};

exports["default"] = accounts;
module.exports = exports["default"];