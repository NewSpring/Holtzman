/*

  Give action types

*/

"use strict";

exports.__esModule = true;
var types = {
  SET_PROGRESS: "GIVE.SET_PROGRESS",
  STEP_PROGRESS: "GIVE.STEP_PROGRESS",

  SET_SAVED_ACCOUNT: "GIVE.SET_SAVED_ACCOUNT",

  ADD_TRANSACTION: "GIVE.ADD_TRANSACTION",
  CLEAR_TRANSACTION: "GIVE.CLEAR_TRANSACTION",
  CLEAR_TRANSACTIONS: "GIVE.CLEAR_TRANSACTIONS",

  SAVE_DATA: "GIVE.SAVE_DATA",
  REMOVE_DATA: "GIVE.REMOVE_DATA",
  CLEAR_DATA: "GIVE.CLEAR_DATA",

  SAVE_SCHEDULE_DATA: "GIVE.SAVE_SCHEDULE_DATA",
  REMOVE_SCHEDULE_DATA: "GIVE.REMOVE_SCHEDULE_DATA",

  SET_STATE: "GIVE.SET_STATE",
  SET_ERROR: "GIVE.SET_ERROR",

  REMOVE_ERROR: "GIVE.REMOVE_ERROR",
  SET_ERRORS: "GIVE.SET_ERRORS",

  SET_SUCCESS: "GIVE.SET_SUCCESS"
};

exports["default"] = {
  types: types,

  setProgress: function setProgress(step) {
    return { type: types.SET_PROGRESS, step: step };
  },
  next: function next() {
    return { type: types.STEP_PROGRESS, increment: 1 };
  },
  previous: function previous() {
    return { type: types.STEP_PROGRESS, increment: -1 };
  },

  setAccount: function setAccount(savedAccount) {
    return { type: types.SET_SAVED_ACCOUNT, savedAccount: savedAccount };
  },
  clearAccount: function clearAccount() {
    return { type: types.SET_SAVED_ACCOUNT, savedAccount: null };
  },

  addTransactions: function addTransactions(transactions) {
    return { type: types.ADD_TRANSACTION, transactions: transactions };
  },
  clearTransaction: function clearTransaction(transactionId) {
    return { type: types.CLEAR_TRANSACTION, transactionId: transactionId };
  },
  clearTransactions: function clearTransactions() {
    return { type: types.CLEAR_TRANSACTIONS };
  },

  save: function save(data) {
    return { type: types.SAVE_DATA, data: data };
  },
  clear: function clear(level, field) {
    return { type: types.REMOVE_DATA, level: level, field: field };
  },
  clearData: function clearData() {
    return { type: types.CLEAR_DATA };
  },

  saveSchedule: function saveSchedule(schedule) {
    return { type: types.SAVE_SCHEDULE_DATA, schedule: schedule };
  },
  clearSchedule: function clearSchedule(field) {
    return { type: types.REMOVE_SCHEDULE_DATA, field: field };
  },

  setState: function setState(state) {
    return { type: types.SET_STATE, state: state };
  },
  submit: function submit() {
    return { type: types.SET_STATE, state: "submit" };
  },
  loading: function loading() {
    return { type: types.SET_STATE, state: "loading" };
  },

  error: function error(_error) {
    return { type: types.SET_ERROR, error: _error };
  },
  fix: function fix(error) {
    return { type: types.REMOVE_ERROR, error: error };
  },

  reset: function reset() {
    return { type: types.SET_ERRORS, errors: {} };
  },
  setErrors: function setErrors(errors) {
    return { type: types.SET_ERRORS, errors: errors };
  },

  success: function success() {
    return { type: types.SET_SUCCESS, success: true };
  },
  fail: function fail() {
    return { type: types.SET_SUCCESS, success: false };
  }

};
module.exports = exports["default"];