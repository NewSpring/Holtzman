
// login = args => Meteor.apply("Rock.login", args)
"use strict";

exports.__esModule = true;
var login = function login(email, password, callback) {
  Meteor.call("Rock.auth.login", email, password, callback);
};

exports["default"] = login;
module.exports = exports["default"];