/* global Meteor */
import { Meteor } from "meteor/meteor";
import { api } from "../../../util/rock";
import { cancelBilling as gatewayCancelBilling } from "../../give/server/nmi";

const remove = (id) => {
  const existing = api.get.sync(`FinancialPersonSavedAccounts/${id}`);
  const result = api.delete.sync(`FinancialPersonSavedAccounts/${id}`);

  // only remove if this is an NMI transaction and we have a gateway code
  if (existing.ReferenceNumber && existing.FinancialGatewayId === api._.give.gateway.id) {
    try {
      Meteor.wrapAsync(gatewayCancelBilling)(existing.ReferenceNumber);
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

export default remove;
