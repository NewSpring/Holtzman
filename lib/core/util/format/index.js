"use strict";

exports.__esModule = true;

var _strings = require("./strings");

var _currency = require("./currency");

var _dates = require("./dates");

var _creditCard = require("./credit-card");

exports["default"] = {
  capitalize: _strings.capitalize,
  toCurrency: _currency.toCurrency,
  toDateString: _dates.toDateString,
  creditCard: _creditCard.creditCard
};
module.exports = exports['default'];