"use strict";

exports.__esModule = true;
exports.AchForm = exports.CreditCardForm = undefined;

var _react = require("react");

var CreditCardForm = function CreditCardForm(_ref) {
  var number = _ref.number;
  var exp = _ref.exp;
  var ccv = _ref.ccv;
  return React.createElement(
    "fieldset",
    null,
    React.createElement("input", { readOnly: true, name: "billing-cc-number", value: number }),
    React.createElement("input", { readOnly: true, name: "billing-cc-exp", value: exp }),
    React.createElement("input", { readOnly: true, name: "billing-cvv", value: ccv })
  );
};

var AchForm = function AchForm(_ref2) {
  var account = _ref2.account;
  var routing = _ref2.routing;
  var name = _ref2.name;
  var type = _ref2.type;
  return React.createElement(
    "fieldset",
    null,
    React.createElement("input", { readOnly: true, name: "billing-account-number", value: account }),
    React.createElement("input", { readOnly: true, name: "billing-routing-number", value: routing }),
    React.createElement("input", { readOnly: true, name: "billing-account-name", value: name }),
    React.createElement("input", { readOnly: true, name: "billing-account-type", value: type }),
    React.createElement("input", { readOnly: true, name: "billing-entity-type", value: "personal" })
  );
};

exports.CreditCardForm = CreditCardForm;
exports.AchForm = AchForm;