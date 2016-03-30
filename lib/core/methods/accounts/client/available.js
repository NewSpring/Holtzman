"use strict";

exports.__esModule = true;
/*global Meteor */

var available = function available(email, callback) {
  Meteor.call("rock/accounts/available", email, callback);
};

exports["default"] = available;
module.exports = exports['default'];