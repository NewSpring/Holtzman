"use strict";

exports.__esModule = true;

var _available = require("./available");

var _available2 = _interopRequireDefault(_available);

var _login = require("./login");

var _login2 = _interopRequireDefault(_login);

var _signup = require("./signup");

var _signup2 = _interopRequireDefault(_signup);

var _resetPassword = require("./resetPassword");

var _resetPassword2 = _interopRequireDefault(_resetPassword);

var _update = require("./update");

var _update2 = _interopRequireDefault(_update);

var _updateHome = require("./updateHome");

var _updateHome2 = _interopRequireDefault(_updateHome);

var _forceReset = require("./forceReset");

var _forceReset2 = _interopRequireDefault(_forceReset);

var _recover = require("./recover");

var _recover2 = _interopRequireDefault(_recover);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

exports["default"] = {
  available: _available2["default"],
  login: _login2["default"],
  signup: _signup2["default"],
  reset: _resetPassword2["default"],
  update: _update2["default"],
  updateHome: _updateHome2["default"],
  forceReset: _forceReset2["default"],
  recover: _recover2["default"]
};
module.exports = exports['default'];