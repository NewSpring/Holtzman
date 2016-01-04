"use strict";

exports.__esModule = true;

var updateHome = function updateHome(data, callback) {
  Meteor.call("Rock.auth.updateHome", data, callback);
};

exports["default"] = updateHome;
module.exports = exports["default"];