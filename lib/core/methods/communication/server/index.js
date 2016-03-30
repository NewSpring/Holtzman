"use strict";

exports.__esModule = true;
exports.slack = exports.email = undefined;

var _email = require("./email");

var _email2 = _interopRequireDefault(_email);

var _slack = require("./slack");

var _slack2 = _interopRequireDefault(_slack);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

exports.email = _email2["default"];
exports.slack = _slack2["default"];