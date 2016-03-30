"use strict";

exports.__esModule = true;
var communication = void 0;

if (Meteor.isClient) {
  communication = require("./client");
}

if (Meteor.isServer) {
  communication = require("./server");
}

exports["default"] = communication;
module.exports = exports['default'];