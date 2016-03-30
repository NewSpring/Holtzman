"use strict";

exports.__esModule = true;
/*global Meteor */

var updateHome = function updateHome(data, callback) {
  Meteor.call("rock/accounts/updateHome", data, callback);
};

exports["default"] = updateHome;
module.exports = exports['default'];