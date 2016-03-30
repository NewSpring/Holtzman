"use strict";

exports.__esModule = true;

var _toggle = require("./toggle");

var _toggle2 = _interopRequireDefault(_toggle);

var _progress = require("./progress");

var _progress2 = _interopRequireDefault(_progress);

var _switch = require("./switch");

var _switch2 = _interopRequireDefault(_switch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Controls = {
  Toggle: _toggle2["default"],
  Switch: _switch2["default"],
  Progress: _progress2["default"]
};

exports["default"] = Controls;
module.exports = exports['default'];