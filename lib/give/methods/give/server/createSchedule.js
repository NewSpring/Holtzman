"use strict";

exports.__esModule = true;

var _scheduledTransactions = require("../../../collections/scheduledTransactions");

var _moment = require("moment");

var _moment2 = _interopRequireDefault(_moment);

var _rock = require("../../../../core/util/rock");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var createSchedule = function createSchedule(response, accountName, id, user) {

  var getCardType = function getCardType(card) {
    var paymentTypes = _rock.api._.give.paymentTypes;

    var ids = {};
    for (var _iterator = paymentTypes, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
      var _ref;

      if (_isArray) {
        if (_i >= _iterator.length) break;
        _ref = _iterator[_i++];
      } else {
        _i = _iterator.next();
        if (_i.done) break;
        _ref = _i.value;
      }

      var f = _ref;
      ids[f.Value] = f;
    }

    var d = /^6$|^6[05]$|^601[1]?$|^65[0-9][0-9]?$|^6(?:011|5[0-9]{2})[0-9\*]{0,12}$/gmi;

    var defaultRegex = {
      visa: /^4[0-9\*]{0,15}$/gmi,
      masterCard: /^5$|^5[1-5][0-9\*]{0,14}$/gmi,
      amEx: /^3$|^3[47][0-9\*]{0,13}$/gmi,
      discover: d
    };

    var definedTypeMapping = {
      visa: ids["Visa"].Id,
      masterCard: ids["MasterCard"].Id,
      // check: 9,
      discover: ids["Discover"].Id,
      amEx: ids["American Express"].Id
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
    var frequencies = _rock.api._.give.frequencies;


    var ids = {};
    for (var _iterator2 = frequencies, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
      var _ref2;

      if (_isArray2) {
        if (_i2 >= _iterator2.length) break;
        _ref2 = _iterator2[_i2++];
      } else {
        _i2 = _iterator2.next();
        if (_i2.done) break;
        _ref2 = _i2.value;
      }

      var f = _ref2;
      ids[f.Value] = f;
    }

    if (plan["day-frequency"]) {
      switch (plan["day-frequency"]) {
        case "7":
          return ids["Weekly"].Id; // Every Week (Rock)
        case "14":
          return ids["Bi-Weekly"].Id; // Every Two Weeks (Rock)
      }
    }

    if (plan["month-frequency"]) {
      switch (plan["month-frequency"]) {
        case "2":
          return ids["Twice a Month"].Id; // Twice A Month (Rock)
        case "1":
          return ids["Monthly"].Id; // Once A Month (Rock)
      }
    }

    if (plan["day-of-month"]) {
      return ids["One-Time"].Id; // One Time (Rock)
    }

    return null;
  };

  var frequency = getFreqencyId(response.plan);

  if (response.result === "1") {

    if (!user || !user.services || !user.services.rock) {
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
      StartDate: "" + (0, _moment2["default"])(response["merchant-defined-field-3"], "YYYYMMDD").toISOString(),
      FinancialGatewayId: _rock.api._.give.gateway.id,
      NextPaymentDate: "" + (0, _moment2["default"])(response["merchant-defined-field-3"], "YYYYMMDD").toISOString(),
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
    };

    if (id) {
      formatedFinancialScheduledTransaction.Id = id;
      formatedFinancialScheduledTransaction.IsActive = true;
    }

    if (accountName) {
      formatedFinancialScheduledTransaction.meta.FinancialPersonSavedAccounts = {
        Name: accountName,
        ReferenceNumber: response["customer-vault-id"],
        TransactionCode: response["transaction-id"]
      };
    }

    if (response.billing["cc-number"]) {
      formatedFinancialScheduledTransaction.FinancialPaymentDetail = CC;
    } else {
      formatedFinancialScheduledTransaction.FinancialPaymentDetail = Check;
    }

    if (response["merchant-defined-field-1"]) {
      var endpoint = (0, _rock.parseEndpoint)("\n        FinancialAccounts?\n          $filter=ParentAccountId eq " + Number(response["merchant-defined-field-1"]) + " and\n          CampusId eq " + Number(response["merchant-defined-field-2"]) + "\n      ");

      var AccountId = _rock.api.get.sync(endpoint);

      if (AccountId.length) {
        AccountId = AccountId[0].Id;
      } else {
        AccountId = Number(response["merchant-defined-field-1"]);
      }

      formatedFinancialScheduledTransaction.ScheduledTransactionDetails.push({
        AccountId: AccountId,
        Amount: Number(response.plan["amount"])
      });
    }

    _scheduledTransactions.ScheduledTransactionReciepts.insert(formatedFinancialScheduledTransaction, function () {});
  }

  return response;
};

exports["default"] = createSchedule;
module.exports = exports['default'];