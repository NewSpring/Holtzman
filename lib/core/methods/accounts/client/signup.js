"use strict";

exports.__esModule = true;
/*global Meteor */

var signup = function signup(data, callback) {
  Meteor.call("rock/accounts/signup", data, callback);
};

exports["default"] = signup;
module.exports = exports['default'];