"use strict";

exports.__esModule = true;

var _nmi = require("./nmi");

var voidPurchase = function voidPurchase(transactionId) {

  return Meteor.wrapAsync(_nmi.voidTransaction)(transactionId);
}; /*global Meteor */

Meteor.methods({ "Give.void": voidPurchase });

exports["default"] = voidPurchase;
module.exports = exports['default'];