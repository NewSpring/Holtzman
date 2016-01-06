/*global Meteor */

import Moment from "moment"

import { api } from "../../../../rock/lib/api"
import { ScheduledTransactionReciepts } from "../../../lib/collections/collections.scheduled-transactions"

import { charge as gatewaySchedule, cancel as gatewayCancel } from "../nmi"

const schedule = (token, accountName) => {

  let response = {}

  try {
    response = Meteor.wrapAsync(gatewaySchedule)(token)
  } catch (e) {
    throw new Meteor.Error(e)
  }


  let user = Meteor.user()

  const getCardType = (card) => {
    const d = /^6$|^6[05]$|^601[1]?$|^65[0-9][0-9]?$|^6(?:011|5[0-9]{2})[0-9\*]{0,12}$/gmi

    const defaultRegex = {
      visa: /^4[0-9\*]{0,15}$/gmi,
      masterCard: /^5$|^5[1-5][0-9\*]{0,14}$/gmi,
      amEx: /^3$|^3[47][0-9\*]{0,13}$/gmi,
      discover: d
    }

    let definedTypeMapping = {
      visa: 7,
      masterCard: 8,
      // check: 9,
      discover: 160,
      amEx: 159
    }

    for (let regex in defaultRegex) {
      if (defaultRegex[regex].test(card)) {
        return definedTypeMapping[regex]
      }
    }

    return null

  }

  let card = getCardType(response.billing["cc-number"])

  const getFreqencyId = (plan) => {

    if (plan["day-frequency"]) {
      switch (plan["day-frequency"]) {
        case "7":
          return 132 // Every Week (Rock)
        case "14":
          return 133 // Every Two Weeks (Rock)
        default:
          return null
      }
    }

    if (plan["month-frequency"]) {
      switch (plan["month-frequency"]) {
        case "2":
          return 134 // Twice A Month (Rock)
        case "1":
          return 135 // Once A Month (Rock)
        default:
          return null
      }
    }

    if (plan["day-of-month"]) {
      return 103 // One Time (Rock)
    }

    return null

  }

  let frequency = getFreqencyId(response.plan)

  if (response.result === "1") {

    if (!user.services || !user.services.rock) {
      user = { services: { rock: {} } }
    }

    let CC = {
      AccountNumberMasked: response.billing["cc-number"],
      CurrencyTypeValueId: 156,
      CreditCardTypeValueId: card
    }

    let Check = {
      AccountNumberMasked: response.billing["account-number"],
      CurrencyTypeValueId: 157
    }

    let formatedFinancialScheduledTransaction = {
      // TransactionCode: response["transaction-id"],
      GatewayScheduleId: response["subscription-id"],
      TransactionFrequencyValueId: frequency,
      IsActive: true,
      StartDate: `${Moment().toISOString()}`,
      FinancialGatewayId: 2, // (need to update to NMI gateway)
      // Summary: `Reference Number: ${response["transaction-id"]}`,
      ScheduledTransactionDetails: [],
      FinancialPaymentDetail: {},
      meta: {
        Person: {
          PrimaryAliasId: user.services.rock.PrimaryAliasId,
          PersonId: user.services.rock.PersonId,
          FirstName: response.billing["first-name"],
          LastName: response.billing["last-name"],
          Email: response.billing.email
        },
        Location: {
          Street1: response.billing.address1,
          Street2: response.billing.address2,
          City: response.billing.city,
          State: response.billing.state,
          Postal: response.billing.postal
        }
      }
    }

    if (accountName) {
      formatedFinancialScheduledTransaction.meta.FinancialPersonSavedAccounts = {
        Name: accountName,
        ReferenceNumber: response["customer-vault-id"],
        TransactionCode: response["transaction-id"]
      }
    }

    if (response.billing["cc-number"]) {
      formatedFinancialScheduledTransaction.FinancialPaymentDetail = CC
    } else {
      formatedFinancialScheduledTransaction.FinancialPaymentDetail = Check

    }


    formatedFinancialScheduledTransaction.ScheduledTransactionDetails.push({
      AccountId: Number(response["merchant-defined-field-1"]),
      Amount: Number(response.plan["amount"])
    })


    ScheduledTransactionReciepts.insert(formatedFinancialScheduledTransaction, () => {

    })
  }


  if (user) {
    Meteor.users.upsert(user._id,{
      $set: {
        "services.nmi": {
          customerId: response["customer-id"]
          // customerVaultId: response["customer-vault-id"],
        }
      }
    }, () => {

    })
  }

  return response

}

Meteor.methods({ "Give.schedule.charge": schedule })


const cancel = ({ Id, GatewayScheduleId }) => {
  let response = {}

  try {
    response = Meteor.wrapAsync(gatewayCancel)(GatewayScheduleId)
  } catch (e) {
    throw new Meteor.Error(e)
  }

  response = api.patch.sync(`FinancialScheduledTransactions/${Id}`, { IsActive: false })

  if (response.status) {
    throw new Meteor.Error(response)
  }

  return true
}

Meteor.methods({ "Give.schedule.cancel": cancel })


export default schedule
