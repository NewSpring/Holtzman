"use strict";

exports.__esModule = true;
/*global Meteor */

var reset = function reset(currentPassword, newPassword, callback) {
  Meteor.call("rock/accounts/reset", currentPassword, newPassword, callback);
};

exports["default"] = reset;
module.exports = exports['default'];