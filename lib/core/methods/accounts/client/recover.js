"use strict";

exports.__esModule = true;
/*global Meteor */

var recover = function recover(email, personId, callback) {
  Meteor.call("rock/accounts/recover", email, personId, callback);
};

exports["default"] = recover;
module.exports = exports['default'];