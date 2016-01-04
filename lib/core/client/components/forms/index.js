"use strict";

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _checkbox = require("./checkbox");

var _checkbox2 = _interopRequireDefault(_checkbox);

var _input = require("./input");

var _input2 = _interopRequireDefault(_input);

var _select = require("./select");

var _select2 = _interopRequireDefault(_select);

var _formJsx = require("./form.jsx");

var _formJsx2 = _interopRequireDefault(_formJsx);

var Forms = {
  Checkbox: _checkbox2["default"],
  Input: _input2["default"],
  Select: _select2["default"],
  Form: _formJsx2["default"]
};

exports["default"] = Forms;
module.exports = exports["default"];