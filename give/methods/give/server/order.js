/*global Meteor */
import { api } from "../../../../core/util/rock"
import { order as gatewayOrder } from "./nmi"

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

  if (user && user.services.rock && method != "add-subscription") {
    orderData["customer-id"] = user.services.rock.PersonAliasId
  }

  if (orderData.savedAccount) {
    let accountDetails = api.get.sync(`FinancialPersonSavedAccounts/${orderData.savedAccount}`)
    delete orderData.savedAccount
    if (accountDetails.ReferenceNumber) {
      orderData["customer-vault-id"] = accountDetails.ReferenceNumber
      // orderData["authorization-code"] = accountDetails.ForeignKey
    }
  }

  const response = Meteor.wrapAsync(gatewayOrder)(orderData, method)
  console.log(response)
  return {
    url: response["form-url"],
    transactionId: response["transaction-id"]
  }

}

Meteor.methods({ "Give.order": order })

export default order
