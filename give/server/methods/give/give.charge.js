
import { api } from "../../../../rock/lib/api"
import { Transactions } from "../../../lib/collections"

import { charge as gatewayCharge } from "../nmi"

const charge = (token) => {

  let response = {}

  try {
    response = Meteor.wrapAsync(gatewayCharge)(token)
  } catch (e) {
    console.log(e.Error, "ERROR IS HERE")
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

  let card = null
  try {
    card = getCardType(response.billing["cc-number"])
  } catch (e) {
    console.log(e, "EEE")
  }


  if (response.result === "1") {

    if (!user.services || !user.services.rock) {
      user = { services: { rock: {} } }
    }
    let formatedTransaction = {
      ForeignKey: response["transaction-id"],
      TransactionTypeValueId: 53,
      FinancialGatewayId: 2,
      Summary: `Reference Number: ${response["transaction-id"]}`,
      TransactionDetails: [],
      FinancialPaymentDetail: {
        AccountNumberMasked: response.billing["cc-number"],
        CurrencyTypeValueId: 156,
        CreditCardTypeValueId: card
      },
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

    if (!Array.isArray(response.product)) {
      response.product = [response.product]
    }
    for (let product of response.product) {
      formatedTransaction.TransactionDetails.push({
        AccountId: Number(product["product-code"]),
        Amount: Number(product["total-amount"])
      })
    }


    Transactions.insert(formatedTransaction, (err, id) => {

    })
  }


  if (user) {
    Meteor.users.upsert(user._id,{
      $set: {
        "services.nmi": {
          customerId: response["customer-id"],
          // customerVaultId: response["customer-vault-id"],
        }
      }
    }, (err, data) => {
      console.log(err, data)
    })
  }

  return response

}

Meteor.methods({ "Give.charge": charge })

export default charge
