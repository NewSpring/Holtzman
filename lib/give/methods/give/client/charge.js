"use strict";

exports.__esModule = true;
/*global Meteor */

var charge = function charge(token, name, id, callback) {
  Meteor.call("give/charge", token, name, id, callback);
};

exports["default"] = charge;
module.exports = exports['default'];