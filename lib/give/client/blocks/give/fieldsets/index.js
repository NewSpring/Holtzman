"use strict";

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _fieldsetsPersonal = require("./fieldsets.personal");

var _fieldsetsPersonal2 = _interopRequireDefault(_fieldsetsPersonal);

var _fieldsetsBillingJsx = require("./fieldsets.billing.jsx");

var _fieldsetsBillingJsx2 = _interopRequireDefault(_fieldsetsBillingJsx);

var _fieldsetsPayment = require("./fieldsets.payment");

var _fieldsetsPayment2 = _interopRequireDefault(_fieldsetsPayment);

var _fieldsetsConfirm = require("./fieldsets.confirm");

var _fieldsetsConfirm2 = _interopRequireDefault(_fieldsetsConfirm);

exports["default"] = {
  Personal: _fieldsetsPersonal2["default"],
  Billing: _fieldsetsBillingJsx2["default"],
  Payment: _fieldsetsPayment2["default"],
  Confirm: _fieldsetsConfirm2["default"]
};
module.exports = exports["default"];