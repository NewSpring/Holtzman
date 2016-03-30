"use strict";

exports.__esModule = true;

var _types = require("./types");

var _types2 = _interopRequireDefault(_types);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

exports["default"] = {
  types: _types2["default"],

  setAccount: function setAccount(account) {
    return { type: _types2["default"].SET_ACCOUNT_STATUS, account: account };
  },

  save: function save(data) {
    return { type: _types2["default"].SET_DATA, data: data };
  },
  clear: function clear(field) {
    return { type: _types2["default"].REMOVE_DATA, field: field };
  },

  setState: function setState(state) {
    return { type: _types2["default"].SET_STATE, state: state };
  },
  submit: function submit() {
    return { type: _types2["default"].SET_STATE, state: "submit" };
  },
  signin: function signin() {
    return { type: _types2["default"].SET_STATE, state: "signin" };
  },
  loading: function loading() {
    return { type: _types2["default"].SET_STATE, state: "loading" };
  },
  signout: function signout() {
    return { type: _types2["default"].SET_STATE, state: "signout" };
  },

  error: function error(_error) {
    return { type: _types2["default"].SET_ERROR, error: _error };
  },
  fix: function fix(error) {
    return { type: _types2["default"].REMOVE_ERROR, error: error };
  },

  reset: function reset() {
    return { type: _types2["default"].REMOVE_ERRORS };
  },
  setErrors: function setErrors(errors) {
    return { type: _types2["default"].SET_ERRORS, errors: errors };
  },

  success: function success() {
    return { type: _types2["default"].SET_SUCCESS, success: true };
  },
  fail: function fail() {
    return { type: _types2["default"].SET_SUCCESS, success: false };
  },

  forgot: function forgot() {
    return { type: _types2["default"].SET_FORGOT, forgot: true };
  },
  remember: function remember() {
    return { type: _types2["default"].SET_FORGOT, forgot: false };
  },

  authorize: function authorize(authorized) {
    return { type: _types2["default"].IS_AUTHORIZED, authorized: authorized };
  },

  person: function person(_person) {
    return { type: _types2["default"].SET_PERSON, person: _person };
  },

  showWelcome: function showWelcome() {
    return { type: _types2["default"].SHOW_WELCOME };
  },

  setAlternateAccounts: function setAlternateAccounts(alternateAccounts) {
    return {
      type: _types2["default"].SET_ALTERNATE_ACCOUNTS,
      alternateAccounts: alternateAccounts
    };
  },

  peopleWithoutAccountEmails: function peopleWithoutAccountEmails(_peopleWithoutAccountEmails) {
    return {
      type: _types2["default"].SET_PEOPLE_WITHOUT_ACCOUNTS,
      peopleWithoutAccountEmails: _peopleWithoutAccountEmails
    };
  },

  completeAccount: function completeAccount() {
    return { type: _types2["default"].COMPLETE_ACCOUNT };
  },
  resetAccount: function resetAccount() {
    return { type: _types2["default"].RESET_ACCOUNT };
  }

};
module.exports = exports['default'];