"use strict";

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _rockLibApi = require("../../../rock/lib/api");

var _libCollectionsCollectionsScheduledTransactions = require("../../lib/collections/collections.scheduled-transactions");

var ScheduledTransactions = function ScheduledTransactions() {
  if (_rockLibApi.api._ && _rockLibApi.api._.baseURL) {

    _libCollectionsCollectionsScheduledTransactions.ScheduledTransactionReciepts.find().observe({
      added: function added(ScheduledTransaction) {
        console.log("here");
        /*
           1. Create person if they dont exist
          2. Create FinancialPaymentDetail
          3. Create ScheduledTransaction
          4. Create ScheduledTransactionDetails
          5a. Create FinancialPersonSavedAccounts
          5b. Create location for person?
          6. Remove record
         */

        var _extends2 = _extends({}, ScheduledTransaction);

        var FinancialPaymentDetail = _extends2.FinancialPaymentDetail;
        var meta = _extends2.meta;
        var ScheduledTransactionDetails = _extends2.ScheduledTransactionDetails;
        var _id = _extends2._id;

        delete ScheduledTransaction.meta;
        delete ScheduledTransaction.FinancialPaymentDetail;
        delete ScheduledTransaction.ScheduledTransactionDetails;
        delete ScheduledTransaction._id;

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
        console.log(FinancialPaymentDetail, _rockLibApi.api._);
        var FinancialPaymentDetailId = _rockLibApi.api.post.sync("FinancialPaymentDetails", FinancialPaymentDetail);
        console.log(FinancialPaymentDetailId);

        if (FinancialPaymentDetailId.status) {
          return;
        }

        // Create ScheduledTransaction
        ScheduledTransaction = _extends({}, ScheduledTransaction, {
          Guid: _rockLibApi.api.makeGUID(),
          AuthorizedPersonAliasId: PrimaryAliasId,
          CreatedByPersonAliasId: PrimaryAliasId,
          ModifiedByPersonAliasId: PrimaryAliasId,
          FinancialPaymentDetailId: FinancialPaymentDetailId
        });

        console.log(ScheduledTransaction);
        var ScheduledTransactionId = _rockLibApi.api.post.sync("FinancialScheduledTransactions", ScheduledTransaction);
        console.log("ScheduledTransactionId", ScheduledTransactionId);
        if (ScheduledTransactionId.status) {
          return;
        }
        // Create ScheduledTransactionDetails
        for (var _iterator = ScheduledTransactionDetails, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
          var _ref;

          if (_isArray) {
            if (_i >= _iterator.length) break;
            _ref = _iterator[_i++];
          } else {
            _i = _iterator.next();
            if (_i.done) break;
            _ref = _i.value;
          }

          var ScheduledTransactionDetail = _ref;

          ScheduledTransactionDetail = _extends({}, ScheduledTransactionDetail, {
            AccountId: ScheduledTransactionDetail.AccountId,
            Amount: ScheduledTransactionDetail.Amount,
            Guid: _rockLibApi.api.makeGUID(),
            ScheduledTransactionId: ScheduledTransactionId,
            CreatedByPersonAliasId: PrimaryAliasId,
            ModifiedByPersonAliasId: PrimaryAliasId
          });

          var ScheduledTransactionDetailId = _rockLibApi.api.post.sync("FinancialScheduledTransactionDetails", ScheduledTransactionDetail);
          console.log("ScheduledTransactionDetailId", ScheduledTransactionDetailId);
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
        }

        if (ScheduledTransactionId && !ScheduledTransactionId.statusText) {
          // remove record
          _libCollectionsCollectionsScheduledTransactions.ScheduledTransactionReciepts.remove(_id);
        }
      }
    });
  }
};

exports["default"] = ScheduledTransactions;

// {
//   "FinancialPaymentDetail": {
//     "Id": 1443727,
//     "CurrencyTypeValueId": 156,
//     "AccountNumberMasked": "************1111",
//     "CreditCardTypeValue": {
//       "Description": "Visa Card",
//       "Value": "Visa"
//     }
//   },
//   "TransactionFrequencyValue": {
//     "Description": "Once a Month",
//     "Value": "Monthly"
//   },
//   "ScheduledTransactionDetails": [
//     {
//       "ScheduledTransactionId": 1,
//       "Summary": null,
//       "AccountId": 1,
//       "Amount": 10
//     }
//   ],
//   "AuthorizedPersonAliasId": 90818,
//   "TransactionFrequencyValueId": 135,
//   "StartDate": "2015-12-23T00:00:00",
//   "EndDate": null,
//   "NumberOfPayments": null,
//   "NextPaymentDate": "2015-12-23T00:00:00",
//   "LastStatusUpdateDateTime": "2015-12-22T10:13:49.493",
//   "IsActive": true,
//   "FinancialGatewayId": 2,
//   "FinancialPaymentDetailId": 1443727,
//   "TransactionCode": "T20151222101349492",
//   "GatewayScheduleId": "P20151222101349492",
//   "CardReminderDate": null,
//   "LastRemindedDate": null,
//   "CreatedDateTime": "2015-12-22T10:13:49.61",
//   "ModifiedDateTime": "2015-12-22T10:13:49.61",
//   "CreatedByPersonAliasId": 90818,
//   "ModifiedByPersonAliasId": 90818,
//   "Id": 1,
//   "Guid": "f6f10201-4570-4ed8-8287-b8a834429ef1",
//   "ForeignId": null,
//   "ForeignGuid": null,
//   "ForeignKey": null
// },
//

// {
//   "Description": "One Time",
//   "Value": "One-Time",
//   "Id": 130
// },
// {
//   "Description": "Every Week",
//   "Value": "Weekly",
//   "Id": 132
// },
// {
//   "Description": "Every Two Weeks",
//   "Value": "Bi-Weekly",
//   "Id": 133
// },
// {
//   "Description": "Twice a Month",
//   "Value": "Twice a Month",
//   "Id": 134
// },
// {
//   "Description": "Once a Month",
//   "Value": "Monthly",
//   "Id": 135
// },
module.exports = exports["default"];