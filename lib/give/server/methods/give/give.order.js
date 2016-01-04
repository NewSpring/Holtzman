"use strict";

exports.__esModule = true;

var _rockLibApi = require("../../../../rock/lib/api");

var _nmi = require("../nmi");

var order = function order(orderData) {

  var user = Meteor.user();

  if (user && user.services.nmi) {
    orderData["customer-id"] = user.services.nmi.customerId;
  }

  var response = Meteor.wrapAsync(_nmi.order)(orderData);

  return {
    url: response["form-url"],
    transactionId: response["transaction-id"]
  };
};

var schedule = function schedule(scheduleData) {

  var user = Meteor.user();

  var response = Meteor.wrapAsync(_nmi.schedule)(scheduleData);

  return {
    url: response["form-url"],
    transactionId: response["transaction-id"]
  };
};

Meteor.methods({ "Give.order": order });
Meteor.methods({ "Give.schedule": schedule });

exports["default"] = order;
module.exports = exports["default"];