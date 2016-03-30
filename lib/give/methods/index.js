"use strict";

exports.__esModule = true;

var _give = require("./give");

var _give2 = _interopRequireDefault(_give);

var _paymentAccounts = require("./paymentAccounts");

var _paymentAccounts2 = _interopRequireDefault(_paymentAccounts);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

exports["default"] = {
  give: _give2["default"],
  paymentAccounts: _paymentAccounts2["default"]
};
module.exports = exports['default'];