/*

  Modal store

*/

"use strict";

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports["default"] = modal;
var initial = {

  content: {}, // Items to be rendered in section modal
  props: {
    classes: [], // classes to be added to modal
    theme: false, // string of classes to overwrite theme
    styles: {} }
};

// styles to be set on modal component

function modal(state, action) {
  if (state === undefined) state = initial;

  switch (action.type) {
    case "SECTIONS.SET_PROPS":
      return _extends({}, state, {
        props: _extends({}, state.props, action.props)
      });
    case "SECTIONS.SET_CONTENT":
      return _extends({}, state, {
        content: _extends({}, state.content, action.content)
      });
    default:
      return state;
  }
}

module.exports = exports["default"];