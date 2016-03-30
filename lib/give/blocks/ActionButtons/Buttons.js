"use strict";

exports.__esModule = true;

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var PrimaryButton = function PrimaryButton(_ref) {
  var disabled = _ref.disabled;
  var classes = _ref.classes;
  var onClick = _ref.onClick;
  var text = _ref.text;
  var icon = _ref.icon;
  var value = _ref.value;
  var style = _ref.style;
  var dataId = _ref.dataId;
  return React.createElement(
    "button",
    { className: classes, onClick: onClick, disabled: disabled, value: value, "data-id": dataId, style: style },
    text,
    " ",
    icon
  );
};

var SecondaryButton = function SecondaryButton(_ref2) {
  var disabled = _ref2.disabled;
  var onClick = _ref2.onClick;


  var classes = ["btn--thin", "btn--small", "display-inline-block", "push-left@lap-and-up", "push-half-left@handheld"];
  var style = {};

  if (disabled) {
    classes.push("btn--disabled");
    // this should be fixed in junction
    style = {
      backgroundColor: "transparent !important" // handle hover :(
    };
  } else {
      classes.push("btn--dark-tertiary");
    }

  return React.createElement(
    "button",
    {
      style: style,
      disabled: disabled,
      className: classes.join(" "),
      onClick: onClick
    },
    "Register"
  );
};

var Guest = function Guest(_ref3) {
  var disabled = _ref3.disabled;
  var onClick = _ref3.onClick;
  var text = _ref3.text;

  var classes = ["outlined--bottom", "outlined--light"];

  var style = {
    display: "inline"
  };

  if (disabled) {
    classes.push("text-light-tertiary");
    style = (0, _extends3["default"])({}, style, { cursor: "text" });
  } else {
    classes.push("text-dark-tertiary");
    style = (0, _extends3["default"])({}, style, { cursor: "pointer" });
  }

  return React.createElement(
    "div",
    { className: "display-block soft-half-top" },
    React.createElement(
      "h6",
      { className: classes.join(" "), style: style, onClick: onClick },
      text || "Give as Guest"
    )
  );
};

exports["default"] = {
  PrimaryButton: PrimaryButton,
  SecondaryButton: SecondaryButton,
  Guest: Guest
};
module.exports = exports['default'];