/*global Meteor */

import { api } from "../../../../core/util/rock"

const remove = (id) => {

  let result = api.delete.sync(`FinancialPersonSavedAccounts/${id}`)

  if (result.status) {
    throw new Meteor.Error(result)
  }

  return true
}

Meteor.methods({ "PaymentAccounts.remove": remove })

export default remove
