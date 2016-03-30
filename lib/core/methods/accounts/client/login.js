"use strict";

exports.__esModule = true;
/*global Meteor */

// login = args => Meteor.apply("Rock.login", args)
var login = function login(email, password, callback) {
  Meteor.call("rock/accounts/login", email, password, callback);
};

exports["default"] = login;
module.exports = exports['default'];