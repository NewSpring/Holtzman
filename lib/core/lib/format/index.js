"use strict";

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _error = require("../error");

var _error2 = _interopRequireDefault(_error);

var _strings = require("./strings");

var _currency = require("./currency");

var _dates = require("./dates");

var _creditCard = require("./credit-card");

var Format = {};

Format.addFormat = function (name, handler) {
  var _ref;

  if (Format[name]) {
    throw new _error2["default"]("Formatter assigned", "Format function " + name + " is already registered");
  }

  if (!handler || typeof handler != "function") {
    throw new _error2["default"]("Formatter TypeError", "Formatter " + name + " requires a function");
  }

  Format[name] = handler;
  return _ref = {}, _ref[name] = handler, _ref;
};

Format.addFormat("capitalize", _strings.capitalize);

Format.addFormat("toCurrency", _currency.toCurrency);

Format.addFormat("toDateString", _dates.toDateString);

Format.addFormat("creditCard", _creditCard.creditCard);

exports["default"] = Format;
module.exports = exports["default"];