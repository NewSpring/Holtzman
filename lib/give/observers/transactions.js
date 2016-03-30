"use strict";

exports.__esModule = true;

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _rock = require("../../core/util/rock");

var _guid = require("../../core/util/guid");

var _transactions = require("../collections/transactions");

var _upsertLocations = require("./upsertLocations");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var GIVING_EMAIL_ID = false;
var transactions = function transactions() {
  if (_rock.api._ && _rock.api._.baseURL) {

    _transactions.TransactionReciepts.find().observe({
      added: function added(Transaction) {

        /*
           This is a crude (but hopefully successful) way to
          prevent a load balanced env from creating duplicated transactions
         */
        if (Transaction.__processing) {
          return;
        }

        _transactions.TransactionReciepts.update(Transaction._id, {
          $set: {
            __processing: true
          }
        });

        delete Transaction.__processing;

        /*
           1. Create person if they dont exist
          2. Create FinancialPaymentDetail
          3. Create Transaction
          4. Create TransactionDetails
          5a. Create FinancialPersonSavedAccounts
          5b. Create location for person?
          6. Remove record
         */

        var _Transaction = (0, _extends3["default"])({}, Transaction);

        var FinancialPaymentDetail = _Transaction.FinancialPaymentDetail;
        var meta = _Transaction.meta;
        var TransactionDetails = _Transaction.TransactionDetails;
        var _id = _Transaction._id;

        delete Transaction.meta;
        delete Transaction.FinancialPaymentDetail;
        delete Transaction.TransactionDetails;
        delete Transaction._id;

        var Person = meta.Person;
        var FinancialPersonSavedAccounts = meta.FinancialPersonSavedAccounts;
        var Location = meta.Location;

        var _Person = (0, _extends3["default"])({}, Person);

        var PrimaryAliasId = _Person.PrimaryAliasId;
        var PersonId = _Person.PersonId;

        delete Person.PersonId;
        delete Person.PrimaryAliasId;

        // Create Person
        Person = (0, _extends3["default"])({}, Person, {
          Guid: (0, _guid.makeNewGuid)(),
          IsSystem: false,
          Gender: 0,
          ConnectionStatusValueId: 67, // Web Prospect
          SystemNote: "Created from NewSpring Apollos on " + __meteor_runtime_config__.ROOT_URL
        });

        var isGuest = PersonId ? false : true;
        // This scope issue is bizzare to me, but this works
        var ScopedId = PersonId;
        var ScopedAliasId = PrimaryAliasId;
        if (!PersonId) {
          PersonId = _rock.api.post.sync("People", Person);
          PrimaryAliasId = _rock.api.get.sync("People/" + PersonId).PrimaryAliasId;
        } else {
          var RockPerson = _rock.api.get.sync("PersonAlias/" + ScopedAliasId);
          var RockPersonId = RockPerson.Person.Id;
          RockPerson = _rock.api.get.sync("People/" + RockPersonId);
          Person = (0, _extends3["default"])({}, Person, RockPerson);
          PrimaryAliasId = Person.PrimaryAliasId;
          PersonId = Person.Id;
        }

        try {
          // add locatin data to person
          (0, _upsertLocations.upsertLocations)(PersonId, Location);
        } catch (e) {
          console.error("@@TRANSACTION_ERROR", e, PersonId, PrimaryAliasId);
        }

        // Create FinancialPaymentDetail
        FinancialPaymentDetail = (0, _extends3["default"])({}, FinancialPaymentDetail, {
          Guid: (0, _guid.makeNewGuid)()
        });

        var FinancialPaymentDetailId = _rock.api.post.sync("FinancialPaymentDetails", FinancialPaymentDetail);

        if (FinancialPaymentDetailId.status) {
          return;
        }

        // Create Transaction
        Transaction = (0, _extends3["default"])({}, Transaction, {
          Guid: (0, _guid.makeNewGuid)(),
          AuthorizedPersonAliasId: PrimaryAliasId,
          CreatedByPersonAliasId: PrimaryAliasId,
          ModifiedByPersonAliasId: PrimaryAliasId,
          SourceTypeValueId: _rock.api._.rockId ? _rock.api._.rockId : 10,
          FinancialPaymentDetailId: FinancialPaymentDetailId,
          TransactionDateTime: new Date()
        });

        var TransactionId = _rock.api.post.sync("FinancialTransactions", Transaction);

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

          TransactionDetail = (0, _extends3["default"])({}, {
            AccountId: TransactionDetail.AccountId,
            Amount: TransactionDetail.Amount,
            Guid: (0, _guid.makeNewGuid)(),
            TransactionId: TransactionId,
            CreatedByPersonAliasId: PrimaryAliasId,
            ModifiedByPersonAliasId: PrimaryAliasId
          });

          _rock.api.post.sync("FinancialTransactionDetails", TransactionDetail);
        }

        if (FinancialPersonSavedAccounts) {

          // Create FinancialPaymentDetail
          var SecondFinancialPaymentDetail = (0, _extends3["default"])({}, FinancialPaymentDetail, {
            Guid: (0, _guid.makeNewGuid)()
          });

          var SecondFinancialPaymentDetailId = _rock.api.post.sync("FinancialPaymentDetails", SecondFinancialPaymentDetail);

          if (SecondFinancialPaymentDetailId.status) {
            return;
          }

          // Create FinancialPersonSavedAccounts
          FinancialPersonSavedAccounts = (0, _extends3["default"])({}, FinancialPersonSavedAccounts, {
            Guid: (0, _guid.makeNewGuid)(),
            PersonAliasId: PrimaryAliasId,
            FinancialPaymentDetailId: SecondFinancialPaymentDetailId,
            CreatedByPersonAliasId: PrimaryAliasId,
            ModifiedByPersonAliasId: PrimaryAliasId
          });

          if (FinancialPersonSavedAccounts.ReferenceNumber) {
            // @TODO we need a way to let the UI know if this worked or not
            // if we start getting reports of people not being able to save accounts
            // look here first
            _rock.api.post.sync("FinancialPersonSavedAccounts", FinancialPersonSavedAccounts);
          }
        }

        if (TransactionId && !TransactionId.statusText) {
          (function () {

            // taken from https://github.com/SparkDevNetwork/Rock/blob/cb8cb69aff36cf182b5d35c6e14c8a344b035a90/Rock/Transactions/SendPaymentReciepts.cs
            // setup merge fields
            var mergeFields = {
              Person: Person
            };

            var totalAmount = 0;
            var accountAmounts = [];
            for (var _iterator2 = TransactionDetails, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
              var _ref2;

              if (_isArray2) {
                if (_i2 >= _iterator2.length) break;
                _ref2 = _iterator2[_i2++];
              } else {
                _i2 = _iterator2.next();
                if (_i2.done) break;
                _ref2 = _i2.value;
              }

              var detail = _ref2;

              if (detail.Amount === 0 || !detail.AccountId) {
                continue;
              }

              var accountAmount = {
                AccountId: detail.AccountId,
                AccountName: detail.AccountName,
                Amount: detail.Amount
              };

              accountAmounts.push(accountAmount);
              totalAmount += detail.Amount;
            }

            mergeFields["TotalAmount"] = totalAmount;
            mergeFields["GaveAnonymous"] = isGuest;
            mergeFields["ReceiptEmail"] = Person.Email;
            mergeFields["ReceiptEmailed"] = true;
            mergeFields["LastName"] = Person.LastName;
            mergeFields["FirstNames"] = Person.NickName || Person.FirstName;
            mergeFields["TransactionCode"] = Transaction.TransactionCode;
            mergeFields["Amounts"] = accountAmounts;
            mergeFields["AccountNumberMasked"] = FinancialPaymentDetail.AccountNumberMasked.slice(-4);

            // remove record
            _transactions.TransactionReciepts.remove(_id, function (err) {
              if (!err) {

                if (!GIVING_EMAIL_ID) {
                  GIVING_EMAIL_ID = _rock.api.get.sync("SystemEmails?$filter=Title eq 'Giving Receipt'");
                  GIVING_EMAIL_ID = GIVING_EMAIL_ID[0].Id;
                }

                Meteor.call("communication/email/send", GIVING_EMAIL_ID, // Default giving system email
                PrimaryAliasId, mergeFields, function (err, response) {
                  // async stub
                });
              }
            });
          })();
        }
      }
    });
  }
};

exports["default"] = transactions;
module.exports = exports['default'];