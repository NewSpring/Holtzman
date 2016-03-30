"use strict";

exports.__esModule = true;
/*global Meteor, Mongo */

var Campuses = {};

if (Meteor.isClient) {
  Campuses = new Mongo.Collection("campuses");
}

if (Meteor.isServer) {
  Campuses = new Mongo.Collection(null);
}

exports["default"] = Campuses;
module.exports = exports['default'];