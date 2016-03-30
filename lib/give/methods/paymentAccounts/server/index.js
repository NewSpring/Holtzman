"use strict";

exports.__esModule = true;

var _rock = require("../../../../core/util/rock");

var _nmi = require("../../give/server/nmi");

/*global Meteor */

var remove = function remove(id) {

  var existing = _rock.api.get.sync("FinancialPersonSavedAccounts/" + id);
  var result = _rock.api["delete"].sync("FinancialPersonSavedAccounts/" + id);

  // only remove if this is an NMI transaction and we have a gateway code
  if (existing.ReferenceNumber && existing.FinancialGatewayId === _rock.api._.give.gateway.id) {
    try {
      var response = Meteor.wrapAsync(_nmi.cancelBilling)(existing.ReferenceNumber);
    } catch (e) {
      throw new Meteor.Error(e.message ? e.message : e);
    }
  }

  if (result.status) {
    throw new Meteor.Error(result);
  }

  return true;
};

Meteor.methods({ "PaymentAccounts.remove": remove });

exports["default"] = remove;
module.exports = exports['default'];