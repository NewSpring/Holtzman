"use strict";

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _authAvailable = require("./auth.available");

var _authAvailable2 = _interopRequireDefault(_authAvailable);

var _authLogin = require("./auth.login");

var _authLogin2 = _interopRequireDefault(_authLogin);

var _authSignup = require("./auth.signup");

var _authSignup2 = _interopRequireDefault(_authSignup);

var _authResetPassword = require("./auth.reset-password");

var _authResetPassword2 = _interopRequireDefault(_authResetPassword);

var _authUpdate = require("./auth.update");

var _authUpdate2 = _interopRequireDefault(_authUpdate);

var _authUpdateHome = require("./auth.updateHome");

var _authUpdateHome2 = _interopRequireDefault(_authUpdateHome);

exports["default"] = {
  available: _authAvailable2["default"],
  login: _authLogin2["default"],
  signup: _authSignup2["default"],
  reset: _authResetPassword2["default"],
  update: _authUpdate2["default"],
  updateHome: _authUpdateHome2["default"]
};
module.exports = exports["default"];