"use strict";

exports.__esModule = true;

var _react = require("react");

var _spinner = {
  "loader": "spinner__loader___1XD-L",
  "rotate-forever": "spinner__rotate-forever___2_y4L"
};

var _spinner2 = _interopRequireDefault(_spinner);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function getClasses(mergeClasses) {
  var classes = [_spinner2["default"].loader];

  if (mergeClasses) {
    classes = classes.concat(mergeClasses);
  }

  return classes.join(" ");
}

var Spinner = function Spinner(_ref) {
  var theme = _ref.theme;
  var styles = _ref.styles;
  var classes = _ref.classes;
  return React.createElement("div", {
    className: theme || getClasses(classes),
    style: styles || {}
  });
};

exports["default"] = Spinner;
module.exports = exports['default'];