"use strict";

exports.__esModule = true;

var give = void 0;

if (Meteor.isClient) {
  give = {};
}

if (Meteor.isServer) {
  give = require("./server");
}

exports["default"] = give;
module.exports = exports['default'];