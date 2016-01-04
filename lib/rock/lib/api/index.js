"use strict";

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _utilities = require("./utilities");

var _endpoints = require("./endpoints/");

var _endpoints2 = _interopRequireDefault(_endpoints);

exports["default"] = {
  api: _utilities.api,
  endpoints: _endpoints2["default"]
};
module.exports = exports["default"];