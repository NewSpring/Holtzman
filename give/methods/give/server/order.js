/*global Meteor */
import { api } from "../../../../core/util/rock"
import { order as gatewayOrder } from "./nmi"
import createSchedule from "./createSchedule"


const order = (orderData, instant) => {

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
    orderData["customer-id"] = user.services.rock.PrimaryAliasId
  }


  if (orderData.savedAccount) {
    let accountDetails = api.get.sync(`FinancialPersonSavedAccounts/${orderData.savedAccount}`)

    delete orderData.savedAccount
    delete orderData.savedAccountName
    if (accountDetails.ReferenceNumber) {
      delete orderData["customer-id"]
      orderData["customer-vault-id"] = accountDetails.ReferenceNumber
    }
  }


  let response = Meteor.wrapAsync(gatewayOrder)(orderData, method)

  if (instant) {
    response = createSchedule(response)
  }

  return response

}

Meteor.methods({ "give/order": order })

export default order
