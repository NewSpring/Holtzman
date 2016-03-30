"use strict";

exports.__esModule = true;

var accounts = void 0;

if (Meteor.isClient) {
  accounts = require("./client");
}

if (Meteor.isServer) {
  accounts = require("./server");
}

exports["default"] = accounts;
module.exports = exports['default'];