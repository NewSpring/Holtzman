"use strict";

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _home = require("./home");

var _home2 = _interopRequireDefault(_home);

var _campaign = require("./campaign");

var _campaign2 = _interopRequireDefault(_campaign);

var _history = require("./history");

var _history2 = _interopRequireDefault(_history);

var _schedules = require("./schedules");

var _schedules2 = _interopRequireDefault(_schedules);

if (Meteor.isClient) {
  Meteor.subscribe("accounts");
}

var Routes = [].concat(_campaign2["default"].Routes, _history2["default"].Routes, _schedules2["default"].Routes);

exports["default"] = {
  Home: _home2["default"],
  Campaign: _campaign2["default"],
  History: _history2["default"],
  Schedules: _schedules2["default"],

  // combined export of app routes
  Routes: Routes

};
module.exports = exports["default"];