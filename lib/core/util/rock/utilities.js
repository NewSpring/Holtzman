"use strict";

exports.__esModule = true;

var _error = require("../error");

var _error2 = _interopRequireDefault(_error);

var _guid = require("./../guid");

var _startup = require("./startup");

var _startup2 = _interopRequireDefault(_startup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var api = {
  _: {}
};

// registration of required data for Rock
/*global _, Meteor */

api.registerEndpoint = function (obj) {
  if (obj.tokenName && obj.token && obj.baseURL) {
    api._ = obj;

    (0, _startup2["default"])(api);
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
    throw new _error2["default"]("Rock api credientials are missing");
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
    if (callback) {
      callback(null, data);
    }

    return data;
  })["catch"](function (er) {
    if (callback) {
      callback(er);
    }
    return er;
  });
};

api.get = function () {
  var args = void 0;
  args = _.values(arguments);
  args.unshift("GET");
  return api.call.apply(this, args);
};

api["delete"] = function () {
  var args = void 0;
  args = _.values(arguments);
  args.unshift("DELETE");
  return api.call.apply(this, args);
};

api.put = function () {
  var args = void 0;
  args = _.values(arguments);
  args.unshift("PUT");
  return api.call.apply(this, args);
};

api.post = function () {
  var args = void 0;
  args = _.values(arguments);
  args.unshift("POST");
  return api.call.apply(this, args);
};

api.patch = function () {
  var args = void 0;
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

if (Meteor.isServer) {
  for (var meth in api) {
    api[meth].sync = Meteor.wrapAsync(api[meth], api);
  }
}

exports["default"] = {
  api: api,
  parseEndpoint: parseEndpoint
};
module.exports = exports['default'];