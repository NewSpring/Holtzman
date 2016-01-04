"use strict";

exports.__esModule = true;

var People = {};

if (Meteor.isClient) {
  People = new Mongo.Collection("people");
}

if (Meteor.isServer) {
  People = new Mongo.Collection(null);
}

exports["default"] = People;
module.exports = exports["default"];