"use strict";

exports.__esModule = true;

var _rock = require("../../../../core/util/rock");

var _transactions = require("../../../collections/transactions");

var _nmi = require("./nmi");

function charge(token, accountName) {

  var response = {};

  try {
    response = Meteor.wrapAsync(_nmi.charge)(token);
  } catch (e) {
    throw new Meteor.Error(e.message);
  }

  // this was a validation action, we can save the card but that is all
  // we should do. We shoud only do this if there is an account name present
  // see https://github.com/NewSpring/Apollos/issues/439 for more details
  if (response["action-type"] === "validate") {
    var _returnReponse = _.pick(response, "avs-result", "order-id", "cvv-result", "result-code");
    return _returnReponse;
  }

  var user = null;
  if (this.userId) {
    user = Meteor.users.findOne({ _id: this.userId });
  }

  var getCardType = function getCardType(card) {
    var d = /^6$|^6[05]$|^601[1]?$|^65[0-9][0-9]?$|^6(?:011|5[0-9]{2})[0-9\*]{0,12}$/gmi;

    var defaultRegex = {
      visa: /^4[0-9\*]{0,15}$/gmi,
      masterCard: /^5$|^5[1-5][0-9\*]{0,14}$/gmi,
      amEx: /^3$|^3[47][0-9\*]{0,13}$/gmi,
      discover: d
    };

    var definedTypeMapping = {
      visa: 7,
      masterCard: 8,
      // check: 9,
      discover: 160,
      amEx: 159
    };

    for (var regex in defaultRegex) {
      if (defaultRegex[regex].test(card)) {
        return definedTypeMapping[regex];
      }
    }

    return null;
  };

  var card = getCardType(response.billing["cc-number"]);

  if (response.result === "1") {

    user || (user = { services: { rock: {} } });

    var CC = {
      AccountNumberMasked: response.billing["cc-number"],
      CurrencyTypeValueId: 156,
      CreditCardTypeValueId: card
    };

    var Check = {
      AccountNumberMasked: response.billing["account-number"],
      CurrencyTypeValueId: 157
    };

    var formatedTransaction = {
      TransactionCode: response["transaction-id"],
      TransactionTypeValueId: 53,
      FinancialGatewayId: _rock.api._.give.gateway.id,
      Summary: "Reference Number: " + response["transaction-id"],
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
        FinancialGatewayId: _rock.api._.give.gateway.id
      };
    }

    if (response.billing["cc-number"]) {
      formatedTransaction.FinancialPaymentDetail = CC;
    } else {
      formatedTransaction.FinancialPaymentDetail = Check;
    }

    if (!Array.isArray(response.product)) {
      response.product = [response.product];
    }

    for (var _iterator = response.product, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
      var _ref;

      if (_isArray) {
        if (_i >= _iterator.length) break;
        _ref = _iterator[_i++];
      } else {
        _i = _iterator.next();
        if (_i.done) break;
        _ref = _i.value;
      }

      var product = _ref;

      var endpoint = (0, _rock.parseEndpoint)("\n        FinancialAccounts?\n          $filter=ParentAccountId eq " + Number(product["product-code"]) + " and\n          CampusId eq " + Number(response["merchant-defined-field-2"]) + "\n      ");

      var AccountId = _rock.api.get.sync(endpoint);

      if (AccountId.length) {
        AccountId = AccountId[0].Id;
      } else {
        AccountId = Number(product["product-code"]);
      }

      formatedTransaction.TransactionDetails.push({
        AccountId: AccountId,
        AccountName: product.description,
        Amount: Number(product["total-amount"])
      });
    }

    _transactions.TransactionReciepts.insert(formatedTransaction, function () {});
  }

  var returnReponse = _.pick(response, "avs-result", "order-id", "cvv-result", "result-code");
  return returnReponse;
}
/*global Meteor */

Meteor.methods({ "give/charge": charge });

exports["default"] = charge;
module.exports = exports['default'];