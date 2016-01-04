"use strict";

exports.__esModule = true;

var ScheduledTransactions = {};
var ScheduledTransactionReciepts = {};
if (Meteor.isClient) {
  ScheduledTransactions = new Mongo.Collection("scheduledTransactions");
}

if (Meteor.isServer) {
  ScheduledTransactions = new Mongo.Collection(null);
  exports.ScheduledTransactionReciepts = ScheduledTransactionReciepts = new Mongo.Collection("scheduledTransactionReciepts");
}

exports.ScheduledTransactionReciepts = ScheduledTransactionReciepts;
exports["default"] = ScheduledTransactions;