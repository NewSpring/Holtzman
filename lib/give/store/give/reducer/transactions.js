"use strict";

exports.__esModule = true;

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var addTransaction = function addTransaction(state, action) {

  var total = 0;

  var mergedTransactions = (0, _extends3["default"])({}, state.transactions, action.transactions);

  for (var fund in mergedTransactions) {
    if (typeof mergedTransactions[fund].value != "number") {
      delete mergedTransactions[fund];
    }

    total = total + mergedTransactions[fund].value;
  }

  return (0, _extends3["default"])({}, state, {
    transactions: mergedTransactions,
    total: total
  });
};

var clearTransaction = function clearTransaction(state, action) {

  var total = 0;

  console.log(action.transactionId, state.transactions);
  if (!action.transactionId || !state.transactions[action.transactionId]) {
    return state;
  }

  delete state.transactions[action.transactionId];

  for (var fund in state.transactions) {
    if (typeof state.transactions[fund].value != "number") {
      delete state.transactions[fund];
    }

    total = total + state.transactions[fund].value;
  }

  return (0, _extends3["default"])({}, state, {
    transactions: state.transactions,
    total: total
  });
};

var clearTransactions = function clearTransactions(state) {

  return (0, _extends3["default"])({}, state, {
    total: 0,
    transactions: {}
  });
};

exports["default"] = {
  addTransaction: addTransaction,
  clearTransaction: clearTransaction,
  clearTransactions: clearTransactions
};
module.exports = exports['default'];