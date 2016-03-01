/*global Meteor */

import Moment from "moment"

import { api } from "../../../../core/util/rock"
import { charge as gatewaySchedule, cancel as gatewayCancel } from "./nmi"
import createSchedule from "./createSchedule"


/*


  During the transition from F1 to Rock, we have schedules that need
  to be recovered from our imported data

  The criteria for a `recoverable schedule` is the following:
    IsActive (active: false on GQL query) === false
    GatewayCode (gateway on GQL) === null

  When the schedule is reactivated, the GatewayCode is set and it is set back
  to active.

  If the schedule is canceled permantly, and it doesn't have a GatewayCode,
  it is safe to delete it as no auditable information exists.


  Created schedules can be recovered schedules, or new ones entirely.
  If we are recovering a schedule, an id will be passed along with the call.
  We recover by taking the existing schedule, and performing a PATCH with the
  new details, GatewayCode, and IsActive: true. The workflow in Rock for a
  F1 recovered is based off the trigger from GatewayCode null -> value.

  New schedules are created using a POST and the workflow trigger is based off

  ```
  F1 Schedules:
  - Schedule recovered: GatewayCode != previous GatewayCode (alert finance to cancel in F1)
  - Schedule (from F1) canceled: DELETE (alert finance to cancel in F1)

  Rock/Apollos Schedules:
  - Schedule created: generic new record (:partyparrot:)
  - Schedule canceled: IsActive === false (:frowning:)
  ```

*/

const schedule = (token, accountName, id) => {

  let response = {}
  console.log(id)
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

  let existing = api.get.sync(`FinancialScheduledTransactions/${id}`)

  // only remove if this is an NMI transaction and we have a gateway code
  if (gateway && existing.FinancialGatewayId === api._.give.gateway.id) {
    try {
      response = Meteor.wrapAsync(gatewayCancel)(gateway)
    } catch (e) {
      console.log(e)
      throw new Meteor.Error(e.message ? e.message : e)
    }
  }

  // created via Rock / NMI / Apollos
  if (existing.GatewayCode) {
    response = api.patch.sync(`FinancialScheduledTransactions/${id}`, { IsActive: false })
  } else {
    // infellowhsip move over
    response = api.delete.sync(`FinancialScheduledTransactions/${id}`)
  }

  if (response.status) {
    throw new Meteor.Error(response)
  }

  return true
}

Meteor.methods({ "give/schedule/cancel": cancel })


export default schedule
