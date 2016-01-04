"use strict";

exports.__esModule = true;

var available = function available(email, callback) {
  Meteor.call("Rock.auth.available", email, callback);
};

exports["default"] = available;
module.exports = exports["default"];