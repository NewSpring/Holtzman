"use strict";

exports.__esModule = true;
/*global Meteor */

var update = function update(data, callback) {
  Meteor.call("rock/accounts/update", data, callback);
};

exports["default"] = update;
module.exports = exports['default'];