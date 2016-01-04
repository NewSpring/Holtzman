"use strict";

exports.__esModule = true;

var reset = function reset(currentPassword, newPassword, callback) {
  Meteor.call("Rock.auth.reset", currentPassword, newPassword, callback);
};

exports["default"] = reset;
module.exports = exports["default"];