/*global Meteor */
import { api } from "../../../../rock/lib/api"

import { order as gatewayOrder } from "../nmi"

const order = (orderData) => {

  let user = Meteor.user()
  // default to sale
  let method = "sale"

  // offline order using saved account
  if (orderData.savedAccount) {
    method = "sale"
  }

  // subscription creation
  if (orderData["start-date"]) {
    method = "add-subscription"
  }

  if (user && user.services.nmi) {
    orderData["customer-id"] = user.services.nmi.customerId
  }

  if (orderData.savedAccount) {
    let accountDetails = api.get.sync(`FinancialPersonSavedAccounts/${orderData.savedAccount}`)
    delete orderData.savedAccount
    if (accountDetails.TransactionCode && accountDetails.ForeignKey) {
      orderData["customer-vault-id"] = accountDetails.TransactionCode
      // orderData["authorization-code"] = accountDetails.ForeignKey
    }
  }

  const response = Meteor.wrapAsync(gatewayOrder)(orderData, method)
  return {
    url: response["form-url"],
    transactionId: response["transaction-id"]
  }

}

Meteor.methods({ "Give.order": order })

export default order
