"use strict";

exports.__esModule = true;

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _createReducer;

var _utilities = require("../../../core/store/utilities");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var initial = {
  transactions: {},
  scheduledTransactions: {}
};

var reducer = (0, _utilities.createReducer)(initial, (_createReducer = {}, _createReducer["TRANSACTIONS.ADD"] = function TRANSACTIONSADD(state, action) {

  return (0, _extends3["default"])({}, state, {
    transactions: (0, _extends3["default"])({}, state.transactions, action.transactions)
  });
}, _createReducer["TRANSACTIONS.ADD_SCHEDULE"] = function TRANSACTIONSADD_SCHEDULE(state, action) {

  return (0, _extends3["default"])({}, state, {
    scheduledTransactions: (0, _extends3["default"])({}, state.scheduledTransactions, action.scheduledTransactions)
  });
}, _createReducer["TRANSACTIONS.REMOVE_SCHEDULE"] = function TRANSACTIONSREMOVE_SCHEDULE(state, action) {
  var newState = (0, _extends3["default"])({}, state);
  if (newState.scheduledTransactions[action.id]) {
    delete newState.scheduledTransactions[action.id];
  }
  return (0, _extends3["default"])({}, state, {
    scheduledTransactions: newState
  });
}, _createReducer));

(0, _utilities.addReducer)({
  transactions: reducer
});

exports["default"] = {
  add: function add(transactions) {
    return { type: "TRANSACTIONS.ADD", transactions: transactions };
  },
  addSchedule: function addSchedule(scheduledTransactions) {
    return { type: "TRANSACTIONS.ADD_SCHEDULE", scheduledTransactions: scheduledTransactions };
  },
  removeSchedule: function removeSchedule(id) {
    return { type: "TRANSACTIONS.REMOVE_SCHEDULE", id: id };
  }
};
module.exports = exports['default'];