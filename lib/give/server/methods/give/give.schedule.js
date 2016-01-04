"use strict";

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _moment = require("moment");

var _moment2 = _interopRequireDefault(_moment);

var _rockLibApi = require("../../../../rock/lib/api");

var _libCollectionsCollectionsScheduledTransactions = require("../../../lib/collections/collections.scheduled-transactions");

var _nmi = require("../nmi");

var schedule = function schedule(token, accountName) {

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

  var card = getCardType(response.billing["cc-number"]);

  var getFreqencyId = function getFreqencyId(plan) {

    if (plan["day-frequency"]) {
      switch (plan["day-frequency"]) {
        case "7":
          return 132; // Every Week (Rock)
        case "14":
          return 133; // Every Two Weeks (Rock)
        default:
          return null;
      }
    }

    if (plan["month-frequency"]) {
      switch (plan["month-frequency"]) {
        case "2":
          return 134; // Twice A Month (Rock)
        case "1":
          return 135; // Once A Month (Rock)
        default:
          return null;
      }
    }

    if (plan["day-of-month"]) {
      return 103; // One Time (Rock)
    }

    return null;
  };

  var frequency = getFreqencyId(response.plan);

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

    var formatedFinancialScheduledTransaction = {
      // TransactionCode: response["transaction-id"],
      GatewayScheduleId: response["subscription-id"],
      TransactionFrequencyValueId: frequency,
      IsActive: true,
      StartDate: "" + _moment2["default"](response.billing["start-date"], "YYYYMMDD").toISOString(),
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
    };

    if (accountName) {
      formatedFinancialScheduledTransaction.meta.FinancialPersonSavedAccounts = {
        Name: accountName,
        TransactionCode: response["customer-vault-id"]
      };
    }

    if (response.billing["cc-number"]) {
      formatedFinancialScheduledTransaction.FinancialPaymentDetail = CC;
    } else {
      formatedFinancialScheduledTransaction.FinancialPaymentDetail = Check;
    }

    formatedFinancialScheduledTransaction.ScheduledTransactionDetails.push({
      AccountId: Number(response["merchant-defined-field-1"]),
      Amount: Number(response.plan["amount"])
    });

    _libCollectionsCollectionsScheduledTransactions.ScheduledTransactionReciepts.insert(formatedFinancialScheduledTransaction, function (err, id) {});
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

Meteor.methods({ "Give.schedule.charge": schedule });

var cancel = function cancel(_ref) {
  var Id = _ref.Id;
  var GatewayScheduleId = _ref.GatewayScheduleId;

  var response = {};

  try {
    response = Meteor.wrapAsync(_nmi.cancel)(GatewayScheduleId);
  } catch (e) {
    console.log(e, "ERROR IS HERE");
    throw new Meteor.Error(e);
  }

  response = _rockLibApi.api.patch.sync("FinancialScheduledTransactions/" + Id, { IsActive: false });

  if (response.status) {
    throw new Meteor.Error(response);
  }

  return true;
};

Meteor.methods({ "Give.schedule.cancel": cancel });

exports["default"] = schedule;
module.exports = exports["default"];