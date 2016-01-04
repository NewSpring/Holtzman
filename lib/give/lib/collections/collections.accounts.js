"use strict";

exports.__esModule = true;

var Accounts = {};

if (Meteor.isClient) {
  Accounts = new Mongo.Collection("accounts");
}

if (Meteor.isServer) {
  Accounts = new Mongo.Collection(null);
}

exports["default"] = Accounts;
module.exports = exports["default"];