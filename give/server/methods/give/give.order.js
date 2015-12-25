
import { api } from "../../../../rock/lib/api"
import { order as gatewayOrder } from "../nmi"

const order = (orderData) => {

  let user = Meteor.user()

  if (user && user.services.nmi) {
    orderData.sale["customer-id"] = user.services.nmi.customerId
  }

  const response = Meteor.wrapAsync(gatewayOrder)(orderData)

  return response["form-url"]

}

Meteor.methods({ "Give.order": order })

export default order
