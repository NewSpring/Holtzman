/*global REST2DDP, Meteor */

import { api } from "../../../rock/lib/api"

const paymentDetails = () => {
  if (api._ && api._.baseURL && REST2DDP) {

    const getPaymentDetails = function (callback) {

      const user = Meteor.users.findOne(this.userId)

      if (!user || !user.services || !user.services.rock || !user.services.rock.PrimaryAliasId) {
        callback(null, [])
        return
      }

      let query =  api.parseEndpoint(`
        FinancialPersonSavedAccounts?
          $filter=
            PersonAliasId eq ${user.services.rock.PrimaryAliasId}
          &$expand=
            FinancialPaymentDetail,
            FinancialPaymentDetail/CreditCardTypeValue,
            FinancialPaymentDetail/CurrencyTypeValue
          &$select=
            Id,
            Name,
            ModifiedDateTime,
            TransactionCode,
            FinancialPaymentDetail/AccountNumberMasked,
            FinancialPaymentDetail/CurrencyTypeValue/Value,
            FinancialPaymentDetail/CurrencyTypeValue/Description,
            FinancialPaymentDetail/CreditCardTypeValue/Value,
            FinancialPaymentDetail/CreditCardTypeValue/Description
      `)

      api.get(query, callback)

    }


    return REST2DDP.publish("paymentDetails", {
      collectionName: "paymentDetails",
      method: getPaymentDetails,
      jsonPath: "*",
      pollInterval: 10000
    })

  }
}

export default paymentDetails
