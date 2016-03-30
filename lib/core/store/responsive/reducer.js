"use strict";

exports.__esModule = true;

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

exports["default"] = modal;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/*

  responsive store

*/

var breakpoints = {
  "palm": {
    max: 480
  },
  "palm-wide": {
    min: 481,
    max: 768
  },
  "palm-wide-and-up": {
    min: 481
  },
  "handheld": {
    max: 768
  },
  "lap": {
    min: 769,
    max: 1024
  },
  "lap-and-up": {
    min: 769
  },
  "lap-wide": {
    min: 1025,
    max: 1280
  },
  "lap-wide-and-up": {
    min: 1025
  },
  "portable": {
    min: 769,
    max: 1280
  },
  "desk": {
    min: 1281,
    max: 1680
  },
  "desk-and-up": {
    min: 1281
  },
  "desk-wide": {
    min: 1681
  },
  "anchored": {
    min: 1281
  }
};

var initial = {
  width: null, // Number / screen width
  breakpoints: [], // array of stringified breakpoints
  _breakpoints: breakpoints };

// object to test against
function modal() {
  var state = arguments.length <= 0 || arguments[0] === undefined ? initial : arguments[0];
  var action = arguments[1];

  switch (action.type) {
    case "@@RESPONSIVE.SET_BREAKPOINT":
      return (0, _extends3["default"])({}, state, {
        breakpoints: action.breakpoints
      });
    case "@@RESPONSIVE.SET_WIDTH":
      return (0, _extends3["default"])({}, state, {
        width: action.width
      });
    case "@@RESPONSIVE.SET_HEIGHT":
      return (0, _extends3["default"])({}, state, {
        height: action.height
      });
    default:
      return state;
  }
}
module.exports = exports['default'];