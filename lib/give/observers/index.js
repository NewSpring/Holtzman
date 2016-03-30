"use strict";

exports.__esModule = true;

var _transactions = require("./transactions");

var _transactions2 = _interopRequireDefault(_transactions);

var _scheduledTransactions = require("./scheduledTransactions");

var _scheduledTransactions2 = _interopRequireDefault(_scheduledTransactions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var observers = {
  transactions: _transactions2["default"],
  schedules: _scheduledTransactions2["default"]
};

var observe = function observe() {
  for (var observer in observers) {
    observers[observer]();
  }
};

exports["default"] = observe;
module.exports = exports['default'];