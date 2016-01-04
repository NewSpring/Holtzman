"use strict";

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _rockLibApi = require("../../../rock/lib/api");

var _libCollectionsCollectionsTransactions = require("../../lib/collections/collections.transactions");

var transactions = function transactions() {
  if (_rockLibApi.api._ && _rockLibApi.api._.baseURL) {

    _libCollectionsCollectionsTransactions.TransactionReciepts.find().observe({
      added: function added(Transaction) {

        /*
           1. Create person if they dont exist
          2. Create FinancialPaymentDetail
          3. Create Transaction
          4. Create TransactionDetails
          5a. Create FinancialPersonSavedAccounts
          5b. Create location for person?
          6. Remove record
         */

        var _extends2 = _extends({}, Transaction);

        var FinancialPaymentDetail = _extends2.FinancialPaymentDetail;
        var meta = _extends2.meta;
        var TransactionDetails = _extends2.TransactionDetails;
        var _id = _extends2._id;

        delete Transaction.meta;
        delete Transaction.FinancialPaymentDetail;
        delete Transaction.TransactionDetails;
        delete Transaction._id;

        var Person = meta.Person;
        var Location = meta.Location;
        var FinancialPersonSavedAccounts = meta.FinancialPersonSavedAccounts;

        var _extends3 = _extends({}, Person);

        var PrimaryAliasId = _extends3.PrimaryAliasId;
        var PersonId = _extends3.PersonId;

        delete Person.PersonId;
        delete Person.PrimaryAliasId;

        // Create Person
        Person = _extends({}, Person, {
          Guid: _rockLibApi.api.makeGUID(),
          IsSystem: false,
          Gender: 0,
          SystemNote: "Created from NewSpring Apollos"
        });

        if (!PersonId) {
          PersonId = _rockLibApi.api.post.sync("People", Person);
          PrimaryAliasId = _rockLibApi.api.get.sync("People/" + PersonId).PrimaryAliasId;
        }

        // Create FinancialPaymentDetail
        FinancialPaymentDetail = _extends({}, FinancialPaymentDetail, {
          Guid: _rockLibApi.api.makeGUID()
        });

        console.log(FinancialPaymentDetail);
        var FinancialPaymentDetailId = _rockLibApi.api.post.sync("FinancialPaymentDetails", FinancialPaymentDetail);
        console.log("FinancialPaymentDetailId", FinancialPaymentDetailId);
        if (FinancialPaymentDetailId.status) {
          return;
        }
        // Create Transaction
        Transaction = _extends({}, Transaction, {
          Guid: _rockLibApi.api.makeGUID(),
          AuthorizedPersonAliasId: PrimaryAliasId,
          CreatedByPersonAliasId: PrimaryAliasId,
          ModifiedByPersonAliasId: PrimaryAliasId,
          SourceTypeValueId: 10,
          FinancialPaymentDetailId: FinancialPaymentDetailId,
          TransactionDateTime: new Date()
        });

        var TransactionId = _rockLibApi.api.post.sync("FinancialTransactions", Transaction);
        console.log("TransactionId", TransactionId);
        if (TransactionId.status) {
          return;
        }

        // Create TransactionDetails
        for (var _iterator = TransactionDetails, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
          var _ref;

          if (_isArray) {
            if (_i >= _iterator.length) break;
            _ref = _iterator[_i++];
          } else {
            _i = _iterator.next();
            if (_i.done) break;
            _ref = _i.value;
          }

          var TransactionDetail = _ref;

          TransactionDetail = _extends({}, TransactionDetail, {
            AccountId: TransactionDetail.AccountId,
            Amount: TransactionDetail.Amount,
            Guid: _rockLibApi.api.makeGUID(),
            TransactionId: TransactionId,
            CreatedByPersonAliasId: PrimaryAliasId,
            ModifiedByPersonAliasId: PrimaryAliasId
          });

          var TransactionDetailId = _rockLibApi.api.post.sync("FinancialTransactionDetails", TransactionDetail);
        }

        if (FinancialPersonSavedAccounts) {
          // Create FinancialPersonSavedAccounts
          FinancialPersonSavedAccounts = _extends({}, FinancialPersonSavedAccounts, {
            Guid: _rockLibApi.api.makeGUID(),
            PersonAliasId: PrimaryAliasId,
            FinancialPaymentDetailId: FinancialPaymentDetailId,
            CreatedByPersonAliasId: PrimaryAliasId,
            ModifiedByPersonAliasId: PrimaryAliasId
          });

          var FinancialPersonSavedAccountsId = _rockLibApi.api.post.sync("FinancialPersonSavedAccounts", FinancialPersonSavedAccounts);
          console.log(FinancialPersonSavedAccountsId);
        }

        if (TransactionId && !TransactionId.statusText) {
          // remove record
          _libCollectionsCollectionsTransactions.TransactionReciepts.remove(_id);
        }
      }
    });
  }
};

exports["default"] = transactions;

// {
//      "FinancialPaymentDetail": {
//        "AccountNumberMasked": null,
//        "CurrencyTypeValueId": 156,
//        "CreditCardTypeValueId": null,
//        "NameOnCardEncrypted": null,
//        "ExpirationMonthEncrypted": null,
//        "ExpirationYearEncrypted": null,
//        "BillingLocationId": null,
//        "CreatedDateTime": null,
//        "ModifiedDateTime": null,
//        "CreatedByPersonAliasId": null,
//        "ModifiedByPersonAliasId": null,
//        "Id": 917571,
//        "Guid": "290782b3-650c-4bc9-85cb-62a1d7270046",
//        "ForeignId": null,
//        "ForeignGuid": null,
//        "ForeignKey": null
//      },
//    "TransactionDetails": [
//      {
//        "TransactionId": 6105,
//        "AccountId": 8,
//        "IsNonCash": false,
//        "Amount": 15,
//        "Summary": null,
//        "EntityTypeId": null,
//        "EntityId": null,
//        "CreatedDateTime": "2014-11-25T09:31:59",
//        "ModifiedDateTime": null,
//        "CreatedByPersonAliasId": null,
//        "ModifiedByPersonAliasId": null,
//        "Id": 6105,
//        "Guid": "eed0491c-f2b3-4bef-993c-00e2c4ead525",
//        "ForeignId": null,
//        "ForeignGuid": null,
//        "ForeignKey": null
//      }
//    ],
//    "AuthorizedPersonAliasId": 90818,
//    "BatchId": null,
//    "FinancialGatewayId": 2,
//    "FinancialPaymentDetailId": 917571,
//    "TransactionDateTime": "2014-11-25T09:31:59",
//    "TransactionCode": null,
//    "Summary": "Reference Number: 4169295172680176327038",
//    "TransactionTypeValueId": 53,
//    "SourceTypeValueId": null,
//    "CheckMicrEncrypted": null,
//    "CheckMicrHash": null,
//    "MICRStatus": null,
//    "CheckMicrParts": null,
//    "ScheduledTransactionId": null,
//    "SundayDate": "2014-11-30T00:00:00",
//    "CreatedDateTime": "2014-11-25T09:31:59",
//    "ModifiedDateTime": null,
//    "CreatedByPersonAliasId": 1,
//    "ModifiedByPersonAliasId": null,
//    "Id": 6105,
//    "Guid": "a86a7d4e-b872-4039-8548-71c468368010",
//    "ForeignId": null,
//    "ForeignGuid": null,
//    "ForeignKey": "305819066"
//  },
module.exports = exports["default"];