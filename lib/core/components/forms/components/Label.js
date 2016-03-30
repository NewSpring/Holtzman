"use strict";

exports.__esModule = true;


function style(disabled) {
  if (disabled) {
    return {
      cursor: "inherit"
    };
  }

  return {};
}

var Label = function Label(_ref) {
  var labelFor = _ref.labelFor;
  var labelName = _ref.labelName;
  var disabled = _ref.disabled;
  return React.createElement(
    "label",
    { htmlFor: labelFor, style: style(disabled) },
    labelName
  );
};

exports["default"] = Label;
module.exports = exports['default'];