/*

  Modal store

*/

"use strict";

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports["default"] = modal;
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

function modal(state, action) {
  if (state === undefined) state = initial;

  switch (action.type) {
    case "MODAL.SET_PROPS":
      return _extends({}, state, {
        props: _extends({}, state.props, action.props)
      });
    case "MODAL.SET_CONTENT":
      return _extends({}, state, {
        content: action.content || state.content,
        visible: action.visible || state.visible,
        props: _extends({}, state.props, action.props)
      });
    case "MODAL.SET_VISIBILITY":
      return _extends({}, state, {
        visible: action.visible
      });
    case "MODAL.SET_TYPE":
      return _extends({}, state, {
        state: action.state || state.state
      });
    default:
      return state;
  }
}

module.exports = exports["default"];