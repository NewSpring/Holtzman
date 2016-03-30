"use strict";

exports.__esModule = true;

var routing = void 0;

if (Meteor.isClient) {
  routing = require("./client");
}

if (Meteor.isServer) {
  routing = require("./server");
}

exports["default"] = routing;
module.exports = exports['default'];