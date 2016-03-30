"use strict";

exports.__esModule = true;

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var progress = function progress(state, action) {

  if (action.increment) {
    if (typeof action.increment != "number") {
      return state;
    }

    if (state.step + action.increment <= 0) {
      return state;
    }

    return (0, _extends3["default"])({}, state, {
      step: state.step + action.increment
    });
  }

  return (0, _extends3["default"])({}, state, {
    step: action.step
  });
};

exports["default"] = {
  progress: progress };
module.exports = exports['default'];