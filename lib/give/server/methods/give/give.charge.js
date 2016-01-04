"use strict";

exports.__esModule = true;

var _rockLibApi = require("../../../../rock/lib/api");

var _libCollectionsCollectionsTransactions = require("../../../lib/collections/collections.transactions");

var _nmi = require("../nmi");

var charge = function charge(token, accountName) {

  var response = {};

  try {
    response = Meteor.wrapAsync(_nmi.charge)(token);
  } catch (e) {
    console.log(e, "ERROR IS HERE");
    throw new Meteor.Error(e);
  }

  console.log(response);

  var user = Meteor.user();

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

  var card = null;
  try {
    card = getCardType(response.billing["cc-number"]);
  } catch (e) {
    console.log(e, "EEE");
  }

  if (response.result === "1") {

    if (!user.services || !user.services.rock) {
      user = { services: { rock: {} } };
    }

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
      FinancialGatewayId: 2,
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
        TransactionCode: response["customer-vault-id"]
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

      formatedTransaction.TransactionDetails.push({
        AccountId: Number(product["product-code"]),
        Amount: Number(product["total-amount"])
      });
    }

    _libCollectionsCollectionsTransactions.TransactionReciepts.insert(formatedTransaction, function (err, id) {});
  }

  if (user) {
    Meteor.users.upsert(user._id, {
      $set: {
        "services.nmi": {
          customerId: response["customer-id"]
        }
      }
    }, // customerVaultId: response["customer-vault-id"],
    function (err, data) {
      console.log(err, data);
    });
  }

  return response;
};

Meteor.methods({ "Give.charge": charge });

exports["default"] = charge;
module.exports = exports["default"];