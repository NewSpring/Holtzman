
import { ScheduledTransactionReciepts } from "../../../collections/scheduledTransactions"
import Moment from "moment"
import { api, parseEndpoint } from "../../../../core/util/rock"


const createSchedule = (response, accountName, id) => {

  let user = Meteor.user()

  const getCardType = (card) => {

    const { paymentTypes } = api._.give
    let ids = {}
    for (let f of paymentTypes) { ids[f.Value] = f }

    const d = /^6$|^6[05]$|^601[1]?$|^65[0-9][0-9]?$|^6(?:011|5[0-9]{2})[0-9\*]{0,12}$/gmi

    const defaultRegex = {
      visa: /^4[0-9\*]{0,15}$/gmi,
      masterCard: /^5$|^5[1-5][0-9\*]{0,14}$/gmi,
      amEx: /^3$|^3[47][0-9\*]{0,13}$/gmi,
      discover: d
    }

    let definedTypeMapping = {
      visa: ids["Visa"].Id,
      masterCard: ids["MasterCard"].Id,
      // check: 9,
      discover: ids["Discover"].Id,
      amEx: ids["American Express"].Id
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
    const { frequencies } = api._.give

    let ids = {}
    for (let f of frequencies) { ids[f.Value] = f }

    if (plan["day-frequency"]) {
      switch (plan["day-frequency"]) {
        case "7":
          return ids["Weekly"].Id // Every Week (Rock)
        case "14":
          return ids["Bi-Weekly"].Id // Every Two Weeks (Rock)
      }
    }

    if (plan["month-frequency"]) {
      switch (plan["month-frequency"]) {
        case "2":
          return ids["Twice a Month"].Id // Twice A Month (Rock)
        case "1":
          return ids["Monthly"].Id // Once A Month (Rock)
      }
    }

    if (plan["day-of-month"]) {
      return ids["One-Time"].Id // One Time (Rock)
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
      StartDate: `${Moment(response["merchant-defined-field-3"], "YYYYMMDD").toISOString()}`,
      FinancialGatewayId: api._.give.gateway.id,
      NextPaymentDate: `${Moment(response["merchant-defined-field-3"], "YYYYMMDD").toISOString()}`,
      // "NextPaymentDate": "2016-03-04T00:00:00",
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

    if (id) {
      formatedFinancialScheduledTransaction.Id = id
      formatedFinancialScheduledTransaction.IsActive = true
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


    if (response["merchant-defined-field-1"]) {
      let endpoint = parseEndpoint(`
        FinancialAccounts?
          $filter=ParentAccountId eq ${Number(response["merchant-defined-field-1"])} and
          CampusId eq ${Number(response["merchant-defined-field-2"])}
      `)

      let AccountId = api.get.sync(endpoint)

      if (AccountId.length) {
        AccountId = AccountId[0].Id
      } else {
        AccountId = Number(response["merchant-defined-field-1"])
      }

      formatedFinancialScheduledTransaction.ScheduledTransactionDetails.push({
        AccountId,
        Amount: Number(response.plan["amount"])
      })
    }



    ScheduledTransactionReciepts.insert(formatedFinancialScheduledTransaction, () => {

    })
  }

  return response

}

export default createSchedule
