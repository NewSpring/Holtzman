"use strict";

exports.__esModule = true;

var _extends6 = require("babel-runtime/helpers/extends");

var _extends7 = _interopRequireDefault(_extends6);

var _createReducer; /*
                    
                    
                      Giving workflows state
                    
                    
                    */


var _store = require("../../../../core/store");

var _types = require("../types");

var _types2 = _interopRequireDefault(_types);

var _progress = require("./progress");

var _savedAccounts = require("./savedAccounts");

var _transactions = require("./transactions");

var _scheduledTransactions = require("./scheduledTransactions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var initial = {

  step: 1, // Number (step along in progress bar to show)
  transactionType: "default", // "default", "guest", "recurring"
  url: "", // String representing the endpoint with NMI to submit to
  total: 0, // Number > 0 for allowing to move forward (calculated)
  state: "default", // "default", "loading", "submit", "error", "success"
  attempts: 0, // spam protection (auto calculated)
  reminderDate: null, // Date string for the next reminder

  errors: {
    // <id>: {
    //   message: "Card is declined"
    // }
  },

  savedAccount: {
    id: null, // Id of saved account to charge
    payment: {
      accountNumber: null, // accountNumber to be shown (full, not just last four)
      paymentType: null },
    // type of card
    name: null },

  // name of card
  accounts: {
    // <accountId>: Name
  },

  // transaction data
  transactions: {
    // <accountId>: Number // <accountId>: $ of gift
  },

  // schedules to create
  schedules: {
    // <id> : { (in Rock if it exists), otherwise fund id
    //   start: null,  Date (YYYYMMDD),
    //   payments: null,  future feature for pledges
    //   frequency: null  String of value from Rock
    // }
  },

  scheduleToRecover: null,
  recoverableSchedules: {},

  // form data
  data: {
    personal: {
      firstName: null, // String
      lastName: null, // String
      email: null, // String
      campus: null },
    // String
    billing: {
      streetAddress: null, // String
      streetAddress2: null, // String
      city: null, // String
      state: null, // String
      zip: null, // Number
      country: null },
    // String
    payment: {
      name: null,
      type: "cc", // String ach or cc
      cardNumber: null, // Number
      expiration: null, // String
      ccv: null, // Number
      account: null, // String (for safety with international numbers)
      routing: null // String (for safety with international numbers)
    }
  }

};

exports["default"] = (0, _store.createReducer)(initial, (_createReducer = {}, _createReducer[_types2["default"].SET_PROGRESS] = _progress.progress, _createReducer[_types2["default"].SET_SAVED_ACCOUNT] = _savedAccounts.savedAccount, _createReducer[_types2["default"].ADD_TRANSACTION] = _transactions.addTransaction, _createReducer[_types2["default"].CLEAR_TRANSACTION] = _transactions.clearTransaction, _createReducer[_types2["default"].CLEAR_TRANSACTIONS] = _transactions.clearTransactions, _createReducer[_types2["default"].SET_RECOVERABLE_SCHEDULE] = _scheduledTransactions.setRecoverableSchedule, _createReducer[_types2["default"].DELETE_RECOVERABLE_SCHEDULE] = _scheduledTransactions.deleteRecoverableSchedule, _createReducer[_types2["default"].SET_RECOVERABLE_SCHEDULES] = _scheduledTransactions.setRecoverableSchedules, _createReducer[_types2["default"].DELETE_RECOVERABLE_SCHEDULES] = _scheduledTransactions.deleteRecoverableSchedules, _createReducer[_types2["default"].SAVE_DATA] = function (state, action) {

  // @TODO validation on new data
  return (0, _extends7["default"])({}, state, {
    data: {
      personal: (0, _extends7["default"])({}, state.data.personal, action.data.personal),
      billing: (0, _extends7["default"])({}, state.data.billing, action.data.billing),
      payment: (0, _extends7["default"])({}, state.data.payment, action.data.payment)
    }
  });
}, _createReducer[_types2["default"].REMOVE_DATA] = function (state, action) {
  var _extends2, _extends3;

  if (!action.field || !state.data[action.level] || !state.data[action.level][action.field]) {
    return state;
  }

  return (0, _extends7["default"])({}, state, {
    data: (0, _extends7["default"])({}, state.data, (_extends3 = {}, _extends3[action.level] = (0, _extends7["default"])({}, state.data[action.level], (_extends2 = {}, _extends2[action.field] = null, _extends2)), _extends3))
  });
}, _createReducer[_types2["default"].CLEAR_DATA] = function (state) {

  return (0, _extends7["default"])({}, state, {
    step: initial.step,
    total: initial.total,
    transactions: initial.transactions,
    schedules: initial.schedules,
    url: initial.url,
    data: initial.data,
    success: initial.success,
    state: initial.state,
    errors: initial.errors

  });
}, _createReducer[_types2["default"].SAVE_SCHEDULE_DATA] = function (state, action) {

  if (!action.id) {
    return state;
  }

  var newState = (0, _extends7["default"])({}, state);

  if (newState.schedules[action.id]) {
    newState.schedules[action.id] = (0, _extends7["default"])({}, newState.schedules[action.id], action.schedule);
  } else {
    newState.schedules[action.id] = action.schedule;
  }

  // @TODO validation on new data
  return newState;
}, _createReducer[_types2["default"].REMOVE_SCHEDULE] = function (state, action) {

  if (!action.id) {
    return state;
  }

  var newState = (0, _extends7["default"])({}, state);

  delete newState.schedules[action.id];

  // @TODO validation on new data
  return (0, _extends7["default"])({}, state, newState);
}, _createReducer[_types2["default"].REMOVE_SCHEDULE_DATA] = function (state, action) {
  var _extends4, _extends5;

  if (!action.field || !action.id) {
    return state;
  }

  return (0, _extends7["default"])({}, state, {
    schedules: (0, _extends7["default"])({}, state.schedules, (_extends5 = {}, _extends5[action.id] = (0, _extends7["default"])({}, state.schedules[action.id], (_extends4 = {}, _extends4[state.schedule[action.field]] = null, _extends4)), _extends5))
  });
}, _createReducer[_types2["default"].CLEAR_SCHEDULES] = function (state, action) {

  return (0, _extends7["default"])({}, state, {
    schedules: {}
  });
}, _createReducer[_types2["default"].CLEAR_SCHEDULES_EXCEPT] = function (state, action) {
  var newState = (0, _extends7["default"])({}, state);

  if (newState.schedules[action.id]) {
    for (var schedule in newState.schedules) {
      if (Number(newState.schedules[schedule].id) === Number(action.id)) {
        continue;
      }

      delete newState.schedules[schedule];
    }
  }

  return newState;
}, _createReducer[_types2["default"].SET_STATE] = function (state, action) {

  var stateName = action.state.trim();
  var stateTypes = ["default", "loading", "submit", "error", "success"];

  if (stateTypes.indexOf(stateName) === -1) {
    return state;
  }

  return (0, _extends7["default"])({}, state, {
    state: stateName
  });
}, _createReducer[_types2["default"].SET_ERROR] = function (state, action) {

  if (!action.error) {
    return state;
  }

  return (0, _extends7["default"])({}, state, {
    errors: (0, _extends7["default"])({}, state.errors, action.error)
  });
}, _createReducer[_types2["default"].REMOVE_ERROR] = function (state, action) {

  if (!action.error || !state.errors[action.error]) {
    return state;
  }

  var errors = (0, _extends7["default"])({}, state.errors);

  delete errors[action.error];

  // update the state
  return (0, _extends7["default"])({}, state, {
    errors: errors
  });
}, _createReducer[_types2["default"].SET_ERRORS] = function (state, action) {

  return (0, _extends7["default"])({}, state, {
    errors: (0, _extends7["default"])({}, state.errors, action.errors)
  });
}, _createReducer[_types2["default"].SET_ACCOUNTS] = function (state, action) {

  return (0, _extends7["default"])({}, state, {
    accounts: (0, _extends7["default"])({}, state.accounts, action.accounts)
  });
}, _createReducer[_types2["default"].SET_TRANSACTION_TYPE] = function (state, action) {

  return (0, _extends7["default"])({}, state, {
    transactionType: action.transactionType
  });
}, _createReducer[_types2["default"].SET_TRANSACTION_DETAILS] = function (state, action) {

  return (0, _extends7["default"])({}, state, {
    url: action.url
  });
}, _createReducer[_types2["default"].SET_REMINDER_DATE] = function (state, action) {

  return (0, _extends7["default"])({}, state, {
    reminderDate: action.reminderDate
  });
}, _createReducer));
module.exports = exports['default'];