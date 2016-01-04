"use strict";

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _actionsGive = require("../../actions/give");

var addTransaction = function addTransaction(state, action) {

  var total = 0;

  var mergedTransactions = _extends({}, state.transactions, action.transactions);

  for (var fund in mergedTransactions) {
    if (typeof mergedTransactions[fund].value != "number") {
      delete mergedTransactions[fund];
    }

    total = total + mergedTransactions[fund].value;
  }

  return _extends({}, state, {
    transactions: mergedTransactions,
    total: total
  });
};

var clearTransaction = function clearTransaction(state, action) {

  var total = 0;

  if (!action.transactionId || !state.transactions[action.transactionId]) {
    return state;
  }

  delete state.transactions[action.transactionId];

  for (var fund in state.transactions) {
    if (typeof state.transactions[fund].value != "number") {
      delete mergedTransactions[fund];
    }

    total = total + state.transactions[fund].value;
  }

  return _extends({}, state, {
    transactions: state.transactions,
    total: total
  });
};

var clearTransactions = function clearTransactions(state, action) {

  return _extends({}, state, {
    total: 0,
    transactions: {}
  });
};

exports["default"] = {
  addTransaction: addTransaction,
  clearTransactions: clearTransactions
};
module.exports = exports["default"];