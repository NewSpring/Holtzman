"use strict";

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _nmi = require("./nmi");

var _nmi2 = _interopRequireDefault(_nmi);

var _give = require("./give");

var _give2 = _interopRequireDefault(_give);

var _paymentAccounts = require("./paymentAccounts/");

var _paymentAccounts2 = _interopRequireDefault(_paymentAccounts);

exports["default"] = {
  nmi: _nmi2["default"],
  give: _give2["default"],
  paymentAccounts: _paymentAccounts2["default"]
};
module.exports = exports["default"];