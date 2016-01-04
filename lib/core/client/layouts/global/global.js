"use strict";

exports.__esModule = true;

var _react = require("react");

var _blocks = require("../../blocks");

var Global = function Global(_ref) {
  var children = _ref.children;
  return React.createElement(
    "div",
    { className: " push-double-bottom@handheld soft-bottom@handheld push-double-left@lap-and-up soft-double-left@lap-and-up "
    },
    children,
    React.createElement(_blocks.Nav, null),
    React.createElement(_blocks.Modal, null)
  );
};

exports["default"] = Global;
module.exports = exports["default"];