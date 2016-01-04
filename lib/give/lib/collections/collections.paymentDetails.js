"use strict";

exports.__esModule = true;

var PaymentDetails = {};

if (Meteor.isClient) {
  PaymentDetails = new Mongo.Collection("paymentDetails");
}

if (Meteor.isServer) {
  PaymentDetails = new Mongo.Collection(null);
}

exports["default"] = PaymentDetails;
module.exports = exports["default"];