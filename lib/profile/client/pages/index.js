"use strict";

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _home = require("./home");

var _home2 = _interopRequireDefault(_home);

var _settings = require("./settings");

var _settings2 = _interopRequireDefault(_settings);

var Routes = [].concat(_settings2["default"].Routes);

exports["default"] = {
  Home: _home2["default"],
  Settings: _settings2["default"],

  // combined export of app routes
  Routes: Routes

};
module.exports = exports["default"];