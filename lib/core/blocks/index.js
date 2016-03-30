"use strict";

exports.__esModule = true;

var _authorzied = require("./authorzied");

var _authorzied2 = _interopRequireDefault(_authorzied);

var _global = require("./global");

var _global2 = _interopRequireDefault(_global);

var _accounts = require("./accounts");

var _accounts2 = _interopRequireDefault(_accounts);

var _nav = require("./nav");

var _nav2 = _interopRequireDefault(_nav);

var _modal = require("./modal");

var _modal2 = _interopRequireDefault(_modal);

var _sections = require("./sections");

var _sections2 = _interopRequireDefault(_sections);

var _discover = require("./discover");

var _discover2 = _interopRequireDefault(_discover);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

exports["default"] = {
  Authorized: _authorzied2["default"],
  Global: _global2["default"],
  Nav: _nav2["default"],
  OnBoard: _accounts2["default"],
  Modal: _modal2["default"],
  Sections: _sections2["default"],
  Discover: _discover2["default"]
};
module.exports = exports['default'];