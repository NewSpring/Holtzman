/*global Meteor */
import { api } from "../../../../core/util/rock"
import { order as gatewayOrder } from "./nmi"
import createSchedule from "./createSchedule"


function order(orderData, instant, id){


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

  if (method != "add-subscription") {
    // add in IP address
    let { connection } = this
    let ip = connection.clientAddress

    if (connection.httpHeaders && connection.httpHeaders["x-forwarded-for"]) {
      ip = connection.httpHeaders["x-forwarded-for"]
    }

    orderData["ip-address"] = ip

  }

  try {

    let response = Meteor.wrapAsync(gatewayOrder)(orderData, method)

    if (instant) {
      response = createSchedule(response, null, id)
    }
    return response


  } catch (e) {
    throw new Meteor.Error(e.message)
  }




}

Meteor.methods({ "give/order": order })

export default order
