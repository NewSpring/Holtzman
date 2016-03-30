"use strict";

exports.__esModule = true;

var join = void 0;

if (Meteor.isClient) {
  join = require("./client");
}

if (Meteor.isServer) {
  join = require("./server");
}

exports["default"] = join;
module.exports = exports['default'];