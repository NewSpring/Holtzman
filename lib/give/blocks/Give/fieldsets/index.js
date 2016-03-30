"use strict";

exports.__esModule = true;

var _Personal = require("./Personal");

var _Personal2 = _interopRequireDefault(_Personal);

var _Billing = require("./Billing");

var _Billing2 = _interopRequireDefault(_Billing);

var _Payment = require("./Payment");

var _Payment2 = _interopRequireDefault(_Payment);

var _Confirm = require("./Confirm");

var _Confirm2 = _interopRequireDefault(_Confirm);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

exports["default"] = {
  Personal: _Personal2["default"],
  Billing: _Billing2["default"],
  Payment: _Payment2["default"],
  Confirm: _Confirm2["default"]
};
module.exports = exports['default'];