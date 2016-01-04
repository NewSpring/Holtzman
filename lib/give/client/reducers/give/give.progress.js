"use strict";

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _actionsGive = require("../../actions/give");

var progress = function progress(state, action) {

  return _extends({}, state, {
    step: action.step
  });
};

var step = function step(state, action) {

  if (typeof action.increment != "number") {
    return state;
  }

  return _extends({}, state, {
    step: state.step + action.increment
  });
};

exports["default"] = {
  progress: progress,
  step: step
};
module.exports = exports["default"];