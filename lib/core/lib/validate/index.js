"use strict";

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _error = require("../error");

var _error2 = _interopRequireDefault(_error);

var _creditCard = require("./credit-card");

var Validate = {};

Validate.addValidator = function (name, handler) {
  var _ref;

  if (Validate[name]) {
    throw new _error2["default"]("Validator assigned", "Validate function " + name + " is already registered");
  }

  if (!handler || typeof handler != "function") {
    throw new _error2["default"]("Validator TypeError", "Validator " + name + " requires a function");
  }

  Validate[name] = handler;
  return _ref = {}, _ref[name] = handler, _ref;
};

Validate.addValidator("isCCV", _creditCard.creditCVV);
Validate.addValidator("isCreditCard", _creditCard.creditCard);
Validate.addValidator("isExpiry", _creditCard.creditExpiry);

exports["default"] = Validate;
module.exports = exports["default"];