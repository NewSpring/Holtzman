"use strict";

exports.__esModule = true;

var signup = function signup(data, callback) {
  Meteor.call("Rock.auth.signup", data, callback);
};

exports["default"] = signup;
module.exports = exports["default"];