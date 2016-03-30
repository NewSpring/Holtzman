"use strict";

exports.__esModule = true;
/*global Meteor */

var order = function order(data, callback) {
  Meteor.call("give/order", data, callback);
};

exports["default"] = order;
module.exports = exports['default'];