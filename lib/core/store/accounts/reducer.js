"use strict";

exports.__esModule = true;

var _extends3 = require("babel-runtime/helpers/extends");

var _extends4 = _interopRequireDefault(_extends3);

var _createReducer; /*
                    
                    
                      accounts workflow state managment
                    
                    
                    */


var _utilities = require("../utilities");

var _types = require("./types");

var _types2 = _interopRequireDefault(_types);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var initial = {

  account: true, // has an account
  authorized: false, // is logged in
  forgot: false, // ui state change (should move to component?)
  success: false, // form action result
  showWelcome: false, // show a welcome to your account message
  alternateAccounts: [], // used to let a user know they might have an account
  peopleWithoutAccountEmails: [
    // {
    //   email // String
    //   id // Number
    // }
  ],
  resettingAccount: false,
  hasPerson: false, // used to recommend account recovery to avoid duplicates

  person: {
    age: null, // Number
    birthdate: null, // Date
    campus: {
      name: null, // String
      shortcode: null // String
    },
    email: null, // String
    home: {
      city: null, // String
      country: null, // String
      id: null, // Number
      zip: null, // String
      state: null, // String
      street1: null, // String
      street2: null // String
    },
    firstName: null, // String
    lastName: null, // String
    nickName: null, // String
    phoneNumbers: [],
    photo: null // String
  },

  data: {
    email: null, // String
    password: null, // String (encrypted before launch)
    terms: true, // String,
    firstName: null, // String
    lastName: null, // String
    personId: null // Number
  },

  state: "default", // "submit", "loading", "signout"

  attempts: 0,
  errors: {
    // <id>: {
    //   message: "Email is required"
    // }
  }

};

exports["default"] = (0, _utilities.createReducer)(initial, (_createReducer = {}, _createReducer[_types2["default"].SET_FORGOT] = function (state, action) {

  if (typeof action.forgot != "boolean") {
    return state;
  }

  return (0, _extends4["default"])({}, state, {
    forgot: action.forgot
  });
}, _createReducer[_types2["default"].SET_ACCOUNT_STATUS] = function (state, action) {

  if (typeof action.account != "boolean") {
    return state;
  }

  return (0, _extends4["default"])({}, state, {
    account: action.account
  });
}, _createReducer[_types2["default"].SET_DATA] = function (state, action) {

  // @TODO validation on new data

  return (0, _extends4["default"])({}, state, {
    data: (0, _extends4["default"])({}, state.data, action.data)
  });
}, _createReducer[_types2["default"].REMOVE_DATA] = function (state, action) {
  var _extends2;

  if (!action.field || state.data[action.field]) {
    return state;
  }

  return (0, _extends4["default"])({}, state, {
    data: (0, _extends4["default"])({}, state.data, (_extends2 = {}, _extends2[state.data[action.field]] = null, _extends2))
  });
}, _createReducer[_types2["default"].SET_STATE] = function (state, action) {

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

  return (0, _extends4["default"])({}, state, {
    state: stateName
  });
}, _createReducer[_types2["default"].SET_ERROR] = function (state, action) {

  if (!action.error) {
    return state;
  }

  return (0, _extends4["default"])({}, state, {
    errors: (0, _extends4["default"])({}, state.errors, action.error)
  });
}, _createReducer[_types2["default"].REMOVE_ERROR] = function (state, action) {

  if (!action.error || !state.errors[action.error]) {
    return state;
  }

  var errors = (0, _extends4["default"])({}, state.errors);

  delete errors[action.error];

  // update the state
  return (0, _extends4["default"])({}, state, {
    errors: errors
  });
}, _createReducer[_types2["default"].SET_ERRORS] = function (state, action) {

  return (0, _extends4["default"])({}, state, {
    errors: (0, _extends4["default"])({}, state.errors, action.errors)
  });
}, _createReducer[_types2["default"].REMOVE_ERRORS] = function (state, action) {

  return (0, _extends4["default"])({}, state, {
    errors: {}
  });
}, _createReducer[_types2["default"].SET_SUCCESS] = function (state, action) {

  if (typeof action.success != "boolean") {
    return state;
  }

  return (0, _extends4["default"])({}, state, {
    success: action.success
  });
}, _createReducer[_types2["default"].IS_AUTHORIZED] = function (state, action) {

  if (typeof action.authorized != "boolean") {
    return state;
  }

  return (0, _extends4["default"])({}, state, {
    authorized: action.authorized
  });
}, _createReducer[_types2["default"].SET_PERSON] = function (state, action) {

  if (!action.person) {
    return state;
  }

  if (!action.person.Home) {
    action.person.Home = initial.person.Home;
  }

  if (!action.person.Campus) {
    action.person.Campus = initial.person.Campus;
  }

  return (0, _extends4["default"])({}, state, {
    person: action.person,
    authorized: true
  });
}, _createReducer[_types2["default"].SHOW_WELCOME] = function (state, action) {

  return (0, _extends4["default"])({}, state, {
    showWelcome: true
  });
}, _createReducer[_types2["default"].SET_ALTERNATE_ACCOUNTS] = function (state, action) {

  // @TODO validation on new data

  return (0, _extends4["default"])({}, state, {
    alternateAccounts: action.alternateAccounts
  });
}, _createReducer[_types2["default"].SET_PEOPLE_WITHOUT_ACCOUNTS] = function (state, action) {

  // @TODO validation on new data

  return (0, _extends4["default"])({}, state, {
    peopleWithoutAccountEmails: action.peopleWithoutAccountEmails
  });
}, _createReducer[_types2["default"].COMPLETE_ACCOUNT] = function (state, action) {

  return (0, _extends4["default"])({}, state, {
    resettingAccount: true
  });
}, _createReducer[_types2["default"].RESET_ACCOUNT] = function (state, action) {

  return (0, _extends4["default"])({}, state, {
    resettingAccount: false,
    peopleWithoutAccountEmails: [],
    alternateAccounts: [],
    account: true
  });
}, _createReducer));
module.exports = exports['default'];