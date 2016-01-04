"use strict";

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _call = require("./call");

var _call2 = _interopRequireDefault(_call);

var _methods = require("./methods");

var _methods2 = _interopRequireDefault(_methods);

var _check = require("./check");

var _check2 = _interopRequireDefault(_check);

var _error = require("./error");

var _error2 = _interopRequireDefault(_error);

var _format = require("./format");

var _format2 = _interopRequireDefault(_format);

var _regex = require("./regex");

var _regex2 = _interopRequireDefault(_regex);

var _schemas = require("./schemas");

var _schemas2 = _interopRequireDefault(_schemas);

var _store = require("./store");

var _store2 = _interopRequireDefault(_store);

var _util = require("./util");

var _util2 = _interopRequireDefault(_util);

var _validate = require("./validate");

var _validate2 = _interopRequireDefault(_validate);

exports["default"] = {
  name: "Apollos",
  call: _call2["default"],
  methods: _methods2["default"],
  check: _check2["default"],

  Error: _error2["default"],
  Format: _format2["default"],
  Regex: _regex2["default"],
  Schemas: _schemas2["default"],
  Store: _store2["default"],
  Util: _util2["default"],
  Validate: _validate2["default"]
};
module.exports = exports["default"];