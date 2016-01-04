"use strict";

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _actionsGive = require("../../actions/give");

var savedAccount = function savedAccount(state, action) {

  if (!action.savedAccount) {
    return state;
  }

  return _extends({}, state, {
    savedAccount: action.savedAccount
  });
};

exports["default"] = {
  savedAccount: savedAccount
};
module.exports = exports["default"];