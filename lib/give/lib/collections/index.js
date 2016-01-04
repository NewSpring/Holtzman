"use strict";

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _collectionsAccounts = require("./collections.accounts");

var _collectionsAccounts2 = _interopRequireDefault(_collectionsAccounts);

var _collectionsTransactions = require("./collections.transactions");

var _collectionsTransactions2 = _interopRequireDefault(_collectionsTransactions);

var _collectionsScheduledTransactions = require("./collections.scheduled-transactions");

var _collectionsScheduledTransactions2 = _interopRequireDefault(_collectionsScheduledTransactions);

var _collectionsPaymentDetails = require("./collections.paymentDetails");

var _collectionsPaymentDetails2 = _interopRequireDefault(_collectionsPaymentDetails);

exports["default"] = {
  Accounts: _collectionsAccounts2["default"],
  Transactions: _collectionsTransactions2["default"],
  ScheduledTransactions: _collectionsScheduledTransactions2["default"],
  PaymentDetails: _collectionsPaymentDetails2["default"]
};
module.exports = exports["default"];