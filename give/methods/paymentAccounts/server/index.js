/*global Meteor */

import { api } from "../../../../core/util/rock"
import { cancelBilling as gatewayCancelBilling } from "../../give/server/nmi"
const remove = (id) => {

  let existing = api.get.sync(`FinancialPersonSavedAccounts/${id}`)

  // only remove if this is an NMI transaction and we have a gateway code
  if (existing.ReferenceNumber && existing.FinancialGatewayId === api._.give.gateway.id) {
    try {
      let response = Meteor.wrapAsync(gatewayCancelBilling)(existing.ReferenceNumber)
    } catch (e) {
      throw new Meteor.Error(e.message ? e.message : e)
    }
  }

  let result = api.delete.sync(`FinancialPersonSavedAccounts/${id}`)

  if (result.status) {
    throw new Meteor.Error(result)
  }

  return true
}


Meteor.methods({ "PaymentAccounts.remove": remove })

export default remove
