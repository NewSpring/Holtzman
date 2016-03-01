/*global Meteor */

import Moment from "moment"

import { api } from "../../../../core/util/rock"
import { charge as gatewaySchedule, cancel as gatewayCancel } from "./nmi"
import createSchedule from "./createSchedule"

const schedule = (token, accountName, id) => {

  let response = {}

  try {
    response = Meteor.wrapAsync(gatewaySchedule)(token)
    response = createSchedule(response, accountName, id)
  } catch (e) {
    throw new Meteor.Error(e.message)
  }


  return response

}

Meteor.methods({ "give/schedule": schedule })


const cancel = ({ id, gateway }) => {
  let response = {}

  if (gateway) {
    try {
      response = Meteor.wrapAsync(gatewayCancel)(gateway)
    } catch (e) {
      throw new Meteor.Error(e)
    }
  }


  response = api.patch.sync(`FinancialScheduledTransactions/${Id}`, { IsActive: false })
  // response = api.delete.sync(`FinancialScheduledTransactions/${id}`)

  if (response.status) {
    throw new Meteor.Error(response)
  }

  return true
}

Meteor.methods({ "give/schedule/cancel": cancel })


export default schedule
