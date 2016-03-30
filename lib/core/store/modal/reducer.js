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
  visible: false,
  state: "default", // "full"
  content: null, // component to render within nav
  props: {
    classes: [], // classes to be added to modal
    theme: false, // string of classes to overwrite theme
    styles: {}, // styles to be set on modal component
    keepNav: false
  }
};

function modal() {
  var state = arguments.length <= 0 || arguments[0] === undefined ? initial : arguments[0];
  var action = arguments[1];

  switch (action.type) {
    case "MODAL.SET_PROPS":
      return (0, _extends3["default"])({}, state, {
        props: (0, _extends3["default"])({}, state.props, action.props)
      });
    case "MODAL.SET_CONTENT":
      return (0, _extends3["default"])({}, state, {
        content: action.content || state.content,
        visible: action.visible || state.visible,
        props: (0, _extends3["default"])({}, state.props, action.props)
      });
    case "MODAL.SET_VISIBILITY":
      return (0, _extends3["default"])({}, state, {
        visible: action.visible
      });
    case "MODAL.SET_TYPE":
      return (0, _extends3["default"])({}, state, {
        state: action.state || state.state
      });
    default:
      return state;
  }
}
module.exports = exports['default'];