"use strict";

exports.__esModule = true;

var _rockLibApi = require("../../../rock/lib/api");

var scheduledTransactions = function scheduledTransactions() {
  if (_rockLibApi.api._ && _rockLibApi.api._.baseURL && REST2DDP) {
    var _ret = (function () {

      // let query = api.parseEndpoint(`
      //   FinancialTransactions/GetContributionTransactions/237198/232269
      // `)

      var allAccounts = _rockLibApi.api.parseEndpoint("\n      FinancialAccounts?\n        $expand=\n          ChildAccounts\n        &$select=\n          PublicName,\n          PublicDescription,\n          Id,\n          ChildAccounts/PublicName,\n          ChildAccounts/Id,\n          ChildAccounts/PublicDescription\n        &$filter=\n          ChildAccounts/any(ca: Id ne null) or\n          (Id ne null and ParentAccountId eq null)\n    ");

      var getSchedules = function getSchedules(callback) {

        var user = Meteor.users.findOne(this.userId);

        if (!user || !user.services || !user.services.rock || !user.services.rock.PrimaryAliasId) {
          callback(null, []);
          return;
        }

        var query = _rockLibApi.api.parseEndpoint("\n        FinancialScheduledTransactions?\n          $filter=\n            AuthorizedPersonAliasId eq " + user.services.rock.PrimaryAliasId + " and\n            IsActive eq true\n          &$expand=\n            ScheduledTransactionDetails,\n            TransactionFrequencyValue,\n            FinancialPaymentDetail,\n            FinancialPaymentDetail/CreditCardTypeValue,\n            FinancialPaymentDetail/CurrencyTypeValue\n          &$select=\n            Id,\n            CardReminderDate,\n            ScheduledTransactionDetails/Amount,\n            ScheduledTransactionDetails/AccountId,\n            EndDate,\n            StartDate,\n            NextPaymentDate,\n            TransactionFrequencyValue/Value,\n            TransactionFrequencyValue/Description,\n            FinancialPaymentDetail/CreditCardTypeValue/Value,\n            FinancialPaymentDetail/CreditCardTypeValue/Description,\n            FinancialPaymentDetail/AccountNumberMasked,\n            TransactionCode,\n            GatewayScheduleId,\n            NumberOfPayments,\n            FinancialPaymentDetail/CurrencyTypeValueId,\n            FinancialPaymentDetail/Id,\n            ScheduledTransactionDetails/Summary,\n            ScheduledTransactionDetails/AccountId,\n            ScheduledTransactionDetails/ScheduledTransactionId,\n            ScheduledTransactionDetails/Summary\n      ");

        _rockLibApi.api.get(query, function (err, data) {
          if (err) {
            callback(err);
          }

          _rockLibApi.api.get(allAccounts, function (err, accounts) {
            if (err) {
              callback(err);
            }

            var accountObj = {};

            for (var _iterator = accounts, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
              var _ref;

              if (_isArray) {
                if (_i >= _iterator.length) break;
                _ref = _iterator[_i++];
              } else {
                _i = _iterator.next();
                if (_i.done) break;
                _ref = _i.value;
              }

              var account = _ref;

              for (var _iterator2 = account.ChildAccounts, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
                var _ref2;

                if (_isArray2) {
                  if (_i2 >= _iterator2.length) break;
                  _ref2 = _iterator2[_i2++];
                } else {
                  _i2 = _iterator2.next();
                  if (_i2.done) break;
                  _ref2 = _i2.value;
                }

                var child = _ref2;

                child.parent = account.Id;
                accountObj[child.Id] = child;
              }

              delete account.ChildAccounts;

              // map parent account
              accountObj[account.Id] = account;
            }

            for (var _iterator3 = data, _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
              var _ref3;

              if (_isArray3) {
                if (_i3 >= _iterator3.length) break;
                _ref3 = _iterator3[_i3++];
              } else {
                _i3 = _iterator3.next();
                if (_i3.done) break;
                _ref3 = _i3.value;
              }

              var transaction = _ref3;

              for (var _iterator4 = transaction.ScheduledTransactionDetails, _isArray4 = Array.isArray(_iterator4), _i4 = 0, _iterator4 = _isArray4 ? _iterator4 : _iterator4[Symbol.iterator]();;) {
                var _ref4;

                if (_isArray4) {
                  if (_i4 >= _iterator4.length) break;
                  _ref4 = _iterator4[_i4++];
                } else {
                  _i4 = _iterator4.next();
                  if (_i4.done) break;
                  _ref4 = _i4.value;
                }

                var detail = _ref4;

                var account = accountObj[detail.AccountId];
                if (account) {
                  if (account.parent) {
                    detail.Account = accountObj[account.parent];
                    continue;
                  }
                  detail.Account = account;
                }
              }
            }

            callback(null, data);
          });
        });
      };

      REST2DDP.publish("scheduledTransactions", {
        collectionName: "scheduledTransactions",
        method: getSchedules,
        jsonPath: "*",
        pollInterval: 10000
      });
      return {
        v: undefined
      };
    })();

    if (typeof _ret === "object") return _ret.v;
  }
};

exports["default"] = scheduledTransactions;
module.exports = exports["default"];