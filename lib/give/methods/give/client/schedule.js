"use strict";

exports.__esModule = true;
/*global Meteor */

var schedule = function schedule(token, name, id, callback) {
  Meteor.call("give/schedule", token, name, id, callback);
};

exports["default"] = schedule;
module.exports = exports['default'];