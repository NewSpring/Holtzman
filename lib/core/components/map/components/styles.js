"use strict";

exports.__esModule = true;
exports.K_SIZE = exports.active = exports.hover = exports.base = undefined;

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var K_SIZE = 30;

var base = {
  // initially any map object has left top corner at lat lng coordinates
  // it"s on you to set object origin to 0,0 coordinates
  position: "absolute",
  width: K_SIZE,
  height: K_SIZE,
  left: -K_SIZE / 2,
  top: -K_SIZE / 2,

  border: "5px solid #6bac43",
  borderRadius: K_SIZE,
  backgroundColor: "white",
  textAlign: "center",
  color: "#1c683e",
  fontSize: 16,
  fontWeight: "bold",
  padding: 4,
  cursor: "pointer"
};

var hover = (0, _extends3["default"])({}, base, {
  border: "5px solid #1c683e",
  color: "#6bac43"
});

var active = (0, _extends3["default"])({}, base, {
  color: "#6bac43",
  backgroundColor: "#6bac43"
});

exports.base = base;
exports.hover = hover;
exports.active = active;
exports.K_SIZE = K_SIZE;