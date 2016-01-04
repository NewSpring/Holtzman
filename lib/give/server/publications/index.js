"use strict";

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _accounts = require("./accounts");

var _accounts2 = _interopRequireDefault(_accounts);

var _transactions = require("./transactions");

var _transactions2 = _interopRequireDefault(_transactions);

var _scheduledTransactions = require("./scheduled-transactions");

var _scheduledTransactions2 = _interopRequireDefault(_scheduledTransactions);

var _paymentDetails = require("./paymentDetails");

var _paymentDetails2 = _interopRequireDefault(_paymentDetails);

// observers

var _observers = require("../observers");

var publications = {
  accounts: _accounts2["default"],
  transactions: _transactions2["default"],
  scheduledTransactions: _scheduledTransactions2["default"],
  paymentDetails: _paymentDetails2["default"],
  transactionsObserver: _observers.transactions,
  scheduledTransactionsObserver: _observers.schedules
};

var publish = function publish() {
  for (var publication in publications) {
    publications[publication]();
  }
};

exports["default"] = {
  accounts: _accounts2["default"],
  transactions: _transactions2["default"],
  scheduledTransactions: _scheduledTransactions2["default"],
  paymentDetails: _paymentDetails2["default"],
  publish: publish
};
module.exports = exports["default"];