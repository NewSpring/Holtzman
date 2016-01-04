/*


  Onboarding workflow state managment


*/
"use strict";

exports.__esModule = true;

var _createReducer;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _coreClientReducersUtilities = require("../../../../core/client/reducers/utilities");

var _actionsGive = require("../../actions/give");

var _giveProgress = require("./give.progress");

var _giveSavedAccount = require("./give.saved-account");

var _giveTransactions = require("./give.transactions");

var initial = {

  step: 1, // Number (step along in progress bar to show)
  savedAccount: null, // Id of saved account to charge

  total: 0, // Number > 0 for allowing to move forward (calculated)

  accounts: {
    // <accountId>: Name
  },

  // transaction data
  transactions: {
    // <accountId>: Number // <accountId>: $ of gift
  },

  // schedule data
  schedule: {
    start: null, // Date (YYYYMMDD),
    payments: null, // future feature for pledges
    frequency: null // String of value from Rock
  },

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
      zip: null // Number
    },
    payment: {
      name: null,
      type: "ach", // String ach or cc
      cardNumber: null, // Number
      expiration: null, // String
      ccv: null, // Number
      account: null, // String (for safety with international numbers)
      routing: null // String (for safety with international numbers)
    }
  },

  // action data
  success: false,
  state: "default", // "submit", "loading"
  attempts: 0,
  errors: {
    // <id>: {
    //   message: "Card is declined"
    // }
  }

};

exports["default"] = _coreClientReducersUtilities.createReducer(initial, (_createReducer = {}, _createReducer[_actionsGive.types.SET_PROGRESS] = _giveProgress.progress, _createReducer[_actionsGive.types.STEP_PROGRESS] = _giveProgress.step, _createReducer[_actionsGive.types.SET_SAVED_ACCOUNT] = _giveSavedAccount.savedAccount, _createReducer[_actionsGive.types.ADD_TRANSACTION] = _giveTransactions.addTransaction, _createReducer[_actionsGive.types.CLEAR_TRANSACTIONS] = _giveTransactions.clearTransactions, _createReducer[_actionsGive.types.SAVE_DATA] = function (state, action) {

  // @TODO validation on new data
  return _extends({}, state, {
    data: {
      personal: _extends({}, state.data.personal, action.data.personal),
      billing: _extends({}, state.data.billing, action.data.billing),
      payment: _extends({}, state.data.payment, action.data.payment)
    }
  });
}, _createReducer[_actionsGive.types.REMOVE_DATA] = function (state, action) {
  var _extends2, _extends3;

  if (!action.field || !state.data[action.level] || !state.data[action.level][action.field]) {
    return state;
  }

  return _extends({}, state, {
    data: _extends({}, state.data, (_extends3 = {}, _extends3[state.data[action.level]] = _extends({}, state.data[action.level], (_extends2 = {}, _extends2[state.data[action.level][action.feild]] = null, _extends2)), _extends3))
  });
}, _createReducer[_actionsGive.types.CLEAR_DATA] = function (state, action) {

  return initial;
}, _createReducer[_actionsGive.types.SAVE_SCHEDULE_DATA] = function (state, action) {

  // @TODO validation on new data
  return _extends({}, state, {
    schedule: _extends({}, state.schedule, action.schedule)
  });
}, _createReducer[_actionsGive.types.REMOVE_SCHEDULE_DATA] = function (state, action) {
  var _extends4;

  if (!action.field) {
    return state;
  }

  return _extends({}, state, {
    schedule: _extends({}, state.schedule, (_extends4 = {}, _extends4[state.schedule[field]] = initial.schedule[field], _extends4))
  });
}, _createReducer[_actionsGive.types.SET_STATE] = function (state, action) {

  var stateName = action.state.trim();
  var stateTypes = ["default", "loading", "submit"];

  if (stateTypes.indexOf(stateName) === -1) {
    return state;
  }

  return _extends({}, state, {
    state: stateName
  });
}, _createReducer[_actionsGive.types.SET_ERROR] = function (state, action) {

  if (!action.error) {
    return state;
  }

  return _extends({}, state, {
    errors: _extends({}, state.errors, action.error)
  });
}, _createReducer[_actionsGive.types.REMOVE_ERROR] = function (state, action) {

  if (!action.error || !state.errors[action.error]) {
    return state;
  }

  var errors = _extends({}, state.errors);

  delete errors[action.error];

  // update the state
  return _extends({}, state, {
    errors: errors
  });
}, _createReducer[_actionsGive.types.SET_ERRORS] = function (state, action) {

  return _extends({}, state, {
    errors: _extends({}, state.errors, action.errors)
  });
}, _createReducer[_actionsGive.types.SET_SUCCESS] = function (state, action) {

  if (typeof action.success != "boolean") {
    return state;
  }

  return _extends({}, state, {
    success: action.success
  });
}, _createReducer));
module.exports = exports["default"];