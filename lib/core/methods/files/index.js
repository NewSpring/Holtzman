"use strict";

exports.__esModule = true;

var files = void 0;

if (Meteor.isClient) {
  files = require("./client");
}

if (Meteor.isServer) {
  files = require("./server");
}

exports["default"] = files;
module.exports = exports['default'];