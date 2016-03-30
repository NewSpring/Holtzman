"use strict";

exports.__esModule = true;

var _reactHelmet = require("react-helmet");

var _reactHelmet2 = _interopRequireDefault(_reactHelmet);

var _metadata = require("./metadata");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Meta = function Meta(props) {
  return React.createElement(_reactHelmet2["default"], (0, _metadata.generateData)(props));
};

exports["default"] = Meta;
module.exports = exports['default'];