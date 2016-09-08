
/*global Meteor */

import { api, parseEndpoint } from "../../../util/rock";

import { TransactionReciepts } from "../../../database/collections/transactions";
import { charge as gatewayCharge } from "./nmi";

function charge(token, accountName) {

  let response = {};

  try {
    response = Meteor.wrapAsync(gatewayCharge)(token);
  } catch (e) {
    throw new Meteor.Error(e.message);
  }

  // this was a validation action, we can save the card but that is all
  // we should do. We shoud only do this if there is an account name present
  // see https://github.com/NewSpring/Apollos/issues/439 for more details
  if (response["action-type"] === "validate") {
    const returnReponse = _.pick(response,
      "avs-result", "order-id", "cvv-result", "result-code"
    );
    return returnReponse;
  }


  let user = null;
  if (this.userId) {
    user = Meteor.users.findOne({ _id: this.userId });
  }


  const getCardType = (card) => {
    const d = /^6$|^6[05]$|^601[1]?$|^65[0-9][0-9]?$|^6(?:011|5[0-9]{2})[0-9\*]{0,12}$/gmi;

    const defaultRegex = {
      visa: /^4[0-9\*]{0,15}$/gmi,
      masterCard: /^5$|^5[1-5][0-9\*]{0,14}$/gmi,
      amEx: /^3$|^3[47][0-9\*]{0,13}$/gmi,
      discover: d
    };

    let definedTypeMapping = {
      visa: 7,
      masterCard: 8,
      // check: 9,
      discover: 160,
      amEx: 159
    };

    for (let regex in defaultRegex) {
      if (defaultRegex[regex].test(card)) {
        return definedTypeMapping[regex];
      }
    }

    return null;

  };

  let card = getCardType(response.billing["cc-number"]);


  if (response.result === "1") {

    user || (user = { services: { rock: {} } });

    let CC = {
      AccountNumberMasked: response.billing["cc-number"],
      CurrencyTypeValueId: 156,
      CreditCardTypeValueId: card
    };

    let Check = {
      AccountNumberMasked: response.billing["account-number"],
      CurrencyTypeValueId: 157
    };

    let formatedTransaction = {
      TransactionCode: response["transaction-id"],
      TransactionTypeValueId: 53,
      FinancialGatewayId: api._.give.gateway.id,
      Summary: `Reference Number: ${response["transaction-id"]}`,
      TransactionDetails: [],
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
    };


    if (accountName) {
      formatedTransaction.meta.FinancialPersonSavedAccounts = {
        Name: accountName,
        ReferenceNumber: response["customer-vault-id"],
        TransactionCode: response["transaction-id"],
        FinancialGatewayId: api._.give.gateway.id
      };
    }

    if (response.billing["cc-number"]) {
      formatedTransaction.FinancialPaymentDetail = CC;
    } else {
      formatedTransaction.FinancialPaymentDetail = Check;
    }

    if (!Array.isArray(response.product)) {
      response.product = [ response.product ];
    }

    for (let product of response.product) {
      let endpoint = parseEndpoint(`
        FinancialAccounts?
          $filter=ParentAccountId eq ${Number(product["product-code"])} and
          CampusId eq ${Number(response["merchant-defined-field-2"])}
      `);

      let AccountId = api.get.sync(endpoint);

      if (AccountId.length) {
        AccountId = AccountId[0].Id;
      } else {
        AccountId = Number(product["product-code"]);
      }

      formatedTransaction.TransactionDetails.push({
        AccountId,
        AccountName: product.description,
        Amount: Number(product["total-amount"])
      });
    }

    TransactionReciepts.insert(formatedTransaction, () => {});
  }

  const returnReponse = _.pick(response,
    "avs-result", "order-id", "cvv-result", "result-code"
  );
  return returnReponse;

}

Meteor.methods({ "give/charge": charge });

export default charge;
