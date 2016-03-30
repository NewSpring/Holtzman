"use strict";

exports.__esModule = true;
/*global Meteor */

var reset = function reset(email, callback) {
  Meteor.call("rock/accounts/forceReset", email, callback);
};

exports["default"] = reset;
module.exports = exports['default'];