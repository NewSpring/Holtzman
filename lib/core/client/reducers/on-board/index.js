/*


  Onboarding workflow state managment


*/
"use strict";

exports.__esModule = true;

var _createReducer;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _utilities = require("../utilities");

var _actionsOnBoard = require("../../actions/on-board");

var initial = {

  account: true,
  authorized: false,
  forgot: false,
  success: false,

  person: {
    Age: null, // Number
    BirthDate: null, // Date
    Campus: {
      Name: null, // String
      ShortCode: null },
    // String
    Email: null, // String
    Home: {
      City: null, // String
      Country: null, // String
      Id: null, // Number
      PostalCode: null, // String
      State: null, // String
      Street1: null, // String
      Street2: null },
    // String
    LastName: null, // String
    NickName: null, // String
    PhoneNumber: [],
    PhotoUrl: null // String
  },

  data: {
    email: null, // String
    password: null, // String (encrypted before launch)
    terms: true, // String,
    firstName: null, // String
    lastName: null // String
  },

  state: "default", // "submit", "loading", "signout"

  attempts: 0,
  errors: {
    // <id>: {
    //   message: "Email is required"
    // }
  }

};

exports["default"] = _utilities.createReducer(initial, (_createReducer = {}, _createReducer[_actionsOnBoard.types.SET_FORGOT] = function (state, action) {

  if (typeof action.forgot != "boolean") {
    return state;
  }

  return _extends({}, state, {
    forgot: action.forgot
  });
}, _createReducer[_actionsOnBoard.types.SET_ACCOUNT_STATUS] = function (state, action) {

  if (typeof action.account != "boolean") {
    return state;
  }

  return _extends({}, state, {
    account: action.account
  });
}, _createReducer[_actionsOnBoard.types.SET_DATA] = function (state, action) {

  // @TODO validation on new data

  return _extends({}, state, {
    data: _extends({}, state.data, action.data)
  });
}, _createReducer[_actionsOnBoard.types.REMOVE_DATA] = function (state, action) {
  var _extends2;

  if (!action.field || state.data[action.field]) {
    return state;
  }

  return _extends({}, state, {
    data: _extends({}, state.data, (_extends2 = {}, _extends2[state.data[action.field]] = null, _extends2))
  });
}, _createReducer[_actionsOnBoard.types.SET_STATE] = function (state, action) {

  var stateName = action.state.trim();
  var stateTypes = ["default", "loading", "submit", "signout"];

  if (stateTypes.indexOf(stateName) === -1) {
    return state;
  }

  if (stateName === "signout") {
    state.authorized = false;
    stateName = "default";
    state.person = initial.person;
  }

  return _extends({}, state, {
    state: stateName
  });
}, _createReducer[_actionsOnBoard.types.SET_ERROR] = function (state, action) {

  if (!action.error) {
    return state;
  }

  return _extends({}, state, {
    errors: _extends({}, state.errors, action.error)
  });
}, _createReducer[_actionsOnBoard.types.REMOVE_ERROR] = function (state, action) {

  if (!action.error || !state.errors[action.error]) {
    return state;
  }

  var errors = _extends({}, state.errors);

  delete errors[action.error];

  // update the state
  return _extends({}, state, {
    errors: errors
  });
}, _createReducer[_actionsOnBoard.types.SET_ERRORS] = function (state, action) {

  return _extends({}, state, {
    errors: _extends({}, state.errors, action.errors)
  });
}, _createReducer[_actionsOnBoard.types.SET_SUCCESS] = function (state, action) {

  if (typeof action.success != "boolean") {
    return state;
  }

  return _extends({}, state, {
    success: action.success
  });
}, _createReducer[_actionsOnBoard.types.IS_AUTHORIZED] = function (state, action) {

  if (typeof action.authorized != "boolean") {
    return state;
  }

  return _extends({}, state, {
    authorized: action.authorized
  });
}, _createReducer[_actionsOnBoard.types.SET_PERSON] = function (state, action) {

  if (!action.person) {
    return state;
  }

  if (!action.person.Home) {
    action.person.Home = initial.person.Home;
  }

  if (!action.person.Campus) {
    action.person.Campus = initial.person.Campus;
  }

  return _extends({}, state, {
    person: action.person,
    authorized: true
  });
}, _createReducer));
module.exports = exports["default"];