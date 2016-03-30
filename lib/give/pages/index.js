"use strict";

exports.__esModule = true;

var _now = require("./now");

var _now2 = _interopRequireDefault(_now);

var _campaign = require("./campaign");

var _campaign2 = _interopRequireDefault(_campaign);

var _history = require("./history");

var _history2 = _interopRequireDefault(_history);

var _schedules = require("./schedules");

var _schedules2 = _interopRequireDefault(_schedules);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/*global Meteor*/
if (Meteor.isClient) {
  Meteor.subscribe("accounts");
}

var Routes = [].concat(_now2["default"].Routes, _campaign2["default"].Routes, _history2["default"].Routes, _schedules2["default"].Routes);

exports["default"] = {
  Now: _now2["default"],
  Campaign: _campaign2["default"],
  History: _history2["default"],
  Schedules: _schedules2["default"],

  // combined export of app routes
  Routes: Routes

};
module.exports = exports['default'];