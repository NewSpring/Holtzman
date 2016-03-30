"use strict";

exports.__esModule = true;

var paymentAccounts = void 0;

if (Meteor.isClient) {
  paymentAccounts = {};
}

if (Meteor.isServer) {
  paymentAccounts = require("./server");
}

exports["default"] = paymentAccounts;
module.exports = exports['default'];