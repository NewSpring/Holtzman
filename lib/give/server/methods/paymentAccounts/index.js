"use strict";

exports.__esModule = true;

var _rockLibApi = require("../../../../rock/lib/api");

var remove = function remove(id) {

  var result = _rockLibApi.api["delete"].sync("FinancialPersonSavedAccounts/" + id);

  if (result.status) {
    throw new Meteor.Error(result);
  }

  return true;
};

Meteor.methods({ "PaymentAccounts.remove": remove });

exports["default"] = remove;
module.exports = exports["default"];