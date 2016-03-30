"use strict";

exports.__esModule = true;
/*global Meteor */

var logRoute = function logRoute(path, title, callback) {
  Meteor.call("rock/routes/log", path, title, callback);
};

exports["default"] = logRoute;
module.exports = exports['default'];