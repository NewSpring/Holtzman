"use strict";

exports.__esModule = true;

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

exports["default"] = modal;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/*

  Modal store

*/

var initial = {

  content: {}, // Items to be rendered in section modal
  props: {
    classes: [], // classes to be added to modal
    theme: false, // string of classes to overwrite theme
    styles: {} // styles to be set on modal component
  }
};

function modal() {
  var state = arguments.length <= 0 || arguments[0] === undefined ? initial : arguments[0];
  var action = arguments[1];

  switch (action.type) {
    case "SECTIONS.SET_PROPS":
      return (0, _extends3["default"])({}, state, {
        props: (0, _extends3["default"])({}, state.props, action.props)
      });
    case "SECTIONS.SET_CONTENT":

      //deep merge

      for (var section in action.content) {
        if (state.content[section]) {
          action.content[section] = (0, _extends3["default"])({}, state.content[section], action.content[section]);
        }
      }

      return (0, _extends3["default"])({}, state, {
        content: (0, _extends3["default"])({}, state.content, action.content)
      });
    default:
      return state;
  }
}
module.exports = exports['default'];