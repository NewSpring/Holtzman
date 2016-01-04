/*
  Onboarding action types

  ONBOARD.SET_DATA

  ONBOARD.SET_STATE

  ONBOARD.SET_ERROR

  ONBOARD.CLEAR_ERRORS

  ONBOARD.SET_SUCCESS


*/

"use strict";

exports.__esModule = true;
var types = {
  SET_ACCOUNT_STATUS: "ONBOARD.SET_ACCOUNT_STATUS",
  SET_DATA: "ONBOARD.SET_DATA",
  REMOVE_DATA: "ONBOARD.REMOVE_DATA",
  SET_FORGOT: "ONBOARD.SET_FORGOT",
  SET_STATE: "ONBOARD.SET_STATE",
  SET_ERROR: "ONBOARD.SET_ERROR",
  REMOVE_ERROR: "ONBOARD.REMOVE_ERROR",
  SET_ERRORS: "ONBOARD.SET_ERRORS",
  SET_SUCCESS: "ONBOARD.SET_SUCCESS",
  IS_AUTHORIZED: "ONBOARD.IS_AUTHORIZED",
  SET_PERSON: "ONBOARD.SET_PERSON"
};

exports["default"] = {
  types: types,

  setAccount: function setAccount(account) {
    return { type: types.SET_ACCOUNT_STATUS, account: account };
  },

  save: function save(data) {
    return { type: types.SET_DATA, data: data };
  },
  clear: function clear(field) {
    return { type: types.REMOVE_DATA, field: field };
  },

  setState: function setState(state) {
    return { type: types.SET_STATE, state: state };
  },
  submit: function submit() {
    return { type: types.SET_STATE, state: "submit" };
  },
  signin: function signin() {
    return { type: types.SET_STATE, state: "signin" };
  },
  loading: function loading() {
    return { type: types.SET_STATE, state: "loading" };
  },
  signout: function signout() {
    return { type: types.SET_STATE, state: "signout" };
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
  },

  forgot: function forgot() {
    return { type: types.SET_FORGOT, forgot: true };
  },
  remember: function remember() {
    return { type: types.SET_FORGOT, forgot: false };
  },

  authorize: function authorize(authorized) {
    return { type: types.IS_AUTHORIZED, authorized: authorized };
  },

  person: function person(_person) {
    return { type: types.SET_PERSON, person: _person };
  }

};
module.exports = exports["default"];