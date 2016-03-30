"use strict";

exports.__esModule = true;

var _types = require("./types");

var _types2 = _interopRequireDefault(_types);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

exports["default"] = {
  types: _types2["default"],

  setProgress: function setProgress(step) {
    return { type: _types2["default"].SET_PROGRESS, step: step };
  },
  next: function next() {
    return { type: _types2["default"].SET_PROGRESS, increment: 1 };
  },
  previous: function previous() {
    return { type: _types2["default"].SET_PROGRESS, increment: -1 };
  },

  setAccount: function setAccount(savedAccount) {
    return { type: _types2["default"].SET_SAVED_ACCOUNT, savedAccount: savedAccount };
  },
  clearAccount: function clearAccount() {
    return { type: _types2["default"].SET_SAVED_ACCOUNT, savedAccount: "clear" };
  },

  setAccounts: function setAccounts(accounts) {
    return { type: _types2["default"].SET_ACCOUNTS, accounts: accounts };
  },

  setTransactionType: function setTransactionType(transactionType) {
    return { type: _types2["default"].SET_TRANSACTION_TYPE, transactionType: transactionType };
  },

  addTransactions: function addTransactions(transactions) {
    return { type: _types2["default"].ADD_TRANSACTION, transactions: transactions };
  },
  clearTransaction: function clearTransaction(transactionId) {
    return { type: _types2["default"].CLEAR_TRANSACTION, transactionId: transactionId };
  },
  clearTransactions: function clearTransactions() {
    return { type: _types2["default"].CLEAR_TRANSACTIONS };
  },

  save: function save(data) {
    return { type: _types2["default"].SAVE_DATA, data: data };
  },
  clear: function clear(level, field) {
    return { type: _types2["default"].REMOVE_DATA, level: level, field: field };
  },
  clearData: function clearData() {
    return { type: _types2["default"].CLEAR_DATA };
  },

  setRecoverableSchedule: function setRecoverableSchedule(recoverableSchedule) {
    return { type: _types2["default"].SET_RECOVERABLE_SCHEDULE, recoverableSchedule: recoverableSchedule };
  },

  saveSchedules: function saveSchedules(recoverableSchedules) {
    return { type: _types2["default"].SET_RECOVERABLE_SCHEDULES, recoverableSchedules: recoverableSchedules };
  },
  deleteSchedule: function deleteSchedule(id) {
    return { type: _types2["default"].DELETE_RECOVERABLE_SCHEDULE, id: id };
  },
  deleteRecoverableSchedules: function deleteRecoverableSchedules(id) {
    return { type: _types2["default"].DELETE_RECOVERABLE_SCHEDULES, id: id };
  },

  saveSchedule: function saveSchedule(id, schedule) {
    return { type: _types2["default"].SAVE_SCHEDULE_DATA, id: id, schedule: schedule };
  },
  removeSchedule: function removeSchedule(id) {
    return { type: _types2["default"].REMOVE_SCHEDULE, id: id };
  },
  clearSchedule: function clearSchedule(id, field) {
    return { type: _types2["default"].REMOVE_SCHEDULE_DATA, id: id, field: field };
  },
  clearSchedules: function clearSchedules() {
    return { type: _types2["default"].CLEAR_SCHEDULES };
  },
  clearAllSchedulesExcept: function clearAllSchedulesExcept(id) {
    return { type: _types2["default"].CLEAR_SCHEDULES_EXCEPT, id: id };
  },

  setState: function setState(state) {
    return { type: _types2["default"].SET_STATE, state: state };
  },
  submit: function submit() {
    return { type: _types2["default"].SET_STATE, state: "submit" };
  },
  loading: function loading() {
    return { type: _types2["default"].SET_STATE, state: "loading" };
  },

  error: function error(_error) {
    return { type: _types2["default"].SET_ERROR, error: _error };
  },
  fix: function fix(error) {
    return { type: _types2["default"].REMOVE_ERROR, error: error };
  },

  reset: function reset() {
    return { type: _types2["default"].SET_ERRORS, errors: {} };
  },
  setErrors: function setErrors(errors) {
    return { type: _types2["default"].SET_ERRORS, errors: errors };
  },

  setDetails: function setDetails(url) {
    return { type: _types2["default"].SET_TRANSACTION_DETAILS, url: url };
  },

  setReminder: function setReminder(reminderDate) {
    return { type: _types2["default"].SET_REMINDER_DATE, reminderDate: reminderDate };
  }

};
module.exports = exports['default'];