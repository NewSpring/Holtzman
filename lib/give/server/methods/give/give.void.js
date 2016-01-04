"use strict";

exports.__esModule = true;

var _rockLibApi = require("../../../../rock/lib/api");

var _nmi = require("../nmi");

var voidPurchase = function voidPurchase(transactionId) {

  return Meteor.wrapAsync(_nmi.voidTransaction)(transactionId);
};

Meteor.methods({ "Give.void": voidPurchase });

exports["default"] = voidPurchase;
module.exports = exports["default"];