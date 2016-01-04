/*global Meteor */

import { order as gatewayOrder, schedule as gatewaySchedule } from "../nmi"

const order = (orderData) => {

  let user = Meteor.user()

  if (user && user.services.nmi) {
    orderData["customer-id"] = user.services.nmi.customerId
  }

  const response = Meteor.wrapAsync(gatewayOrder)(orderData)

  return {
    url: response["form-url"],
    transactionId: response["transaction-id"]
  }

}

const schedule = (scheduleData) => {

  const response = Meteor.wrapAsync(gatewaySchedule)(scheduleData)

  return {
    url: response["form-url"],
    transactionId: response["transaction-id"]
  }

}

Meteor.methods({ "Give.order": order })
Meteor.methods({ "Give.schedule": schedule })

export default order
