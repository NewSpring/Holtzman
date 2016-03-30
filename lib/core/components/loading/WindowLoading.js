"use strict";

exports.__esModule = true;

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function getStyles(style) {
  var defaults = {
    position: "fixed",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 9999
  };

  return (0, _extends3["default"])({}, defaults, style);
}

function getClasses(mergeClasses) {
  var classes = [];

  if (mergeClasses) {
    classes = [].concat(classes, mergeClasses);
  }

  return classes.join(" ");
}

var Loading = function Loading(_ref) {
  var theme = _ref.theme;
  var classes = _ref.classes;
  var styles = _ref.styles;
  var children = _ref.children;
  return React.createElement(
    "div",
    {
      className: theme || getClasses(classes),
      style: getStyles(styles)
    },
    children
  );
};

exports["default"] = Loading;
module.exports = exports['default'];