"use strict";

exports.__esModule = true;

var _coreLib = require("../../../core/lib");

var api = {
  _: {}
};

// registration of required data for Rock
api.registerEndpoint = function (obj) {
  if (obj.tokenName && obj.token && obj.baseURL) {
    api._ = obj;
  }
};

/*
  Rock.api.call
  @example make an api call to Rock
    Rock.apiRequest "DELETE", "api/UserLogins/#{user.Id}", (error, data) ->
      throw err if err
      console.log data
  @param method [String] CRUD Method desired
  @param endpoint [String] Url to hit on rock
  @param data [Object, String, Array] data to send to Rock
  @param callback [Function] callback to run on response
 */

api.call = function (method, endpoint, data, callback) {
  var _headers;

  function checkStatus(response) {

    if (response.status >= 200 && response.status < 300) {
      return response;
    } else {
      return {
        status: response.status,
        statusText: response.statusText
      };
    }
  }

  if (typeof data === "function") {
    callback = data;
    data = {};
  }

  if (!this._.tokenName || !this._.token || !this._.baseURL) {
    throw new _coreLib.Error("Rock api credientials are missing");
    return;
  }

  var body = JSON.stringify(data);
  var headers = (_headers = {}, _headers[this._.tokenName] = this._.token, _headers["Content-Type"] = "application/json", _headers);

  var options = {
    method: method,
    body: body,
    headers: headers,
    credentials: "same-origin"
  };

  endpoint = this._.baseURL + "api/" + endpoint;
  return fetch(endpoint, options).then(checkStatus).then(function (response) {
    if (response.status === 204) {
      return true;
    }

    if (response.json) {
      return response.json();
    }

    return response;
  }).then(function (data) {
    callback(null, data);
  })["catch"](function (er) {
    callback(er);
  });
};

api.get = function () {
  var args = undefined;
  args = _.values(arguments);
  args.unshift("GET");
  return api.call.apply(this, args);
};

api["delete"] = function () {
  var args = undefined;
  args = _.values(arguments);
  args.unshift("DELETE");
  return api.call.apply(this, args);
};

api.put = function () {
  var args = undefined;
  args = _.values(arguments);
  args.unshift("PUT");
  return api.call.apply(this, args);
};

api.post = function () {
  var args = undefined;
  args = _.values(arguments);
  args.unshift("POST");
  return api.call.apply(this, args);
};

api.patch = function () {
  var args = undefined;
  args = _.values(arguments);
  args.unshift("PATCH");
  return api.call.apply(this, args);
};

var parseEndpoint = function parseEndpoint(str) {
  return str.split("\n").map(function (x) {
    var trimmed = x.trim();
    if (trimmed.slice(-3) === "and" || trimmed.slice(-2) === "or") {
      trimmed += " ";
    }

    return trimmed;
  }).join("");
};
api.parseEndpoint = parseEndpoint;

var makeGUID = function makeGUID() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  }

  var guid = "" + s4() + s4() + "-" + s4() + "-" + s4() + "-" + s4() + "-" + s4() + s4() + s4();
  return guid.toUpperCase();
};

api.makeGUID = makeGUID;

if (Meteor.isServer) {
  for (var meth in api) {
    api[meth].sync = Meteor.wrapAsync(api[meth], api);
  }
}

exports["default"] = {
  api: api,
  parseEndpoint: parseEndpoint,
  makeGUID: makeGUID
};
module.exports = exports["default"];