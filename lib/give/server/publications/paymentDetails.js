"use strict";

exports.__esModule = true;

var _rockLibApi = require("../../../rock/lib/api");

var paymentDetails = function paymentDetails() {
  if (_rockLibApi.api._ && _rockLibApi.api._.baseURL && REST2DDP) {

    var getPaymentDetails = function getPaymentDetails(callback) {

      var user = Meteor.users.findOne(this.userId);

      if (!user || !user.services || !user.services.rock || !user.services.rock.PrimaryAliasId) {
        callback(null, []);
        return;
      }

      var query = _rockLibApi.api.parseEndpoint("\n        FinancialPersonSavedAccounts?\n          $filter=\n            PersonAliasId eq " + user.services.rock.PrimaryAliasId + "\n          &$expand=\n            FinancialPaymentDetail,\n            FinancialPaymentDetail/CreditCardTypeValue,\n            FinancialPaymentDetail/CurrencyTypeValue\n          &$select=\n            Id,\n            Name,\n            ModifiedDateTime,\n            TransactionCode,\n            FinancialPaymentDetail/AccountNumberMasked,\n            FinancialPaymentDetail/CurrencyTypeValue/Value,\n            FinancialPaymentDetail/CurrencyTypeValue/Description,\n            FinancialPaymentDetail/CreditCardTypeValue/Value,\n            FinancialPaymentDetail/CreditCardTypeValue/Description\n      ");

      _rockLibApi.api.get(query, callback);
    };

    return REST2DDP.publish("paymentDetails", {
      collectionName: "paymentDetails",
      method: getPaymentDetails,
      jsonPath: "*",
      pollInterval: 10000
    });
  }
};

exports["default"] = paymentDetails;
module.exports = exports["default"];