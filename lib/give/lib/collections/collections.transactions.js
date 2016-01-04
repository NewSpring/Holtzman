"use strict";

exports.__esModule = true;

var Transactions = {};
var TransactionReciepts = {};

if (Meteor.isClient) {
  Transactions = new Mongo.Collection("transactions");
}

if (Meteor.isServer) {
  Transactions = new Mongo.Collection(null);
  exports.TransactionReciepts = TransactionReciepts = new Mongo.Collection("transactionReciepts");
}

exports.TransactionReciepts = TransactionReciepts;
exports["default"] = Transactions;