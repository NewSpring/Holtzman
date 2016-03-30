"use strict";

exports.__esModule = true;

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _rock = require("../../core/util/rock");

var _guid = require("../../core/util/guid");

var _scheduledTransactions = require("../collections/scheduledTransactions");

var _upsertLocations = require("./upsertLocations");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var ScheduledTransactions = function ScheduledTransactions() {
  if (_rock.api._ && _rock.api._.baseURL) {

    _scheduledTransactions.ScheduledTransactionReciepts.find().observe({
      added: function added(ScheduledTransaction) {

        /*
           This is a crude (but hopefully successful) way to
          prevent a load balanced env from creating duplicated transactions
         */
        if (ScheduledTransaction.__processing) {
          return;
        }

        _scheduledTransactions.ScheduledTransactionReciepts.update(ScheduledTransaction._id, {
          $set: {
            __processing: true
          }
        });

        delete ScheduledTransaction.__processing;

        /*
           1. Create person if they dont exist
          2. Create FinancialPaymentDetail
          3. Create ScheduledTransaction
          4. Create ScheduledTransactionDetails
          5a. Create FinancialPersonSavedAccounts
          5b. Create location for person?
          6. Remove record
         */

        var _ScheduledTransaction = (0, _extends3["default"])({}, ScheduledTransaction);

        var FinancialPaymentDetail = _ScheduledTransaction.FinancialPaymentDetail;
        var meta = _ScheduledTransaction.meta;
        var ScheduledTransactionDetails = _ScheduledTransaction.ScheduledTransactionDetails;
        var _id = _ScheduledTransaction._id;


        delete ScheduledTransaction.meta;
        delete ScheduledTransaction.FinancialPaymentDetail;
        delete ScheduledTransaction.ScheduledTransactionDetails;
        delete ScheduledTransaction._id;

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

        // this should never be isGuest, but is a saftey net
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
          console.error("@@SCHEDULE_TRANSACTION_ERROR", e, PersonId, PrimaryAliasId);
        }

        // Create FinancialPaymentDetail
        FinancialPaymentDetail = (0, _extends3["default"])({}, FinancialPaymentDetail, {
          Guid: (0, _guid.makeNewGuid)()
        });

        var FinancialPaymentDetailId = _rock.api.post.sync("FinancialPaymentDetails", FinancialPaymentDetail);

        if (FinancialPaymentDetailId.status) {
          return;
        }

        // Create ScheduledTransaction
        ScheduledTransaction = (0, _extends3["default"])({}, ScheduledTransaction, {
          Guid: (0, _guid.makeNewGuid)(),
          AuthorizedPersonAliasId: PrimaryAliasId,
          CreatedByPersonAliasId: PrimaryAliasId,
          ModifiedByPersonAliasId: PrimaryAliasId,
          FinancialPaymentDetailId: FinancialPaymentDetailId
        });

        var ScheduledTransactionId = void 0;
        // either mark is active or create schedule
        if (ScheduledTransaction.Id) {

          ScheduledTransactionId = ScheduledTransaction.Id;
          delete ScheduledTransaction.Id;
          delete ScheduledTransaction.Guid;

          var response = _rock.api.patch.sync("FinancialScheduledTransactions/" + ScheduledTransactionId, ScheduledTransaction);
          if (response.statusText) {
            ScheduledTransactionId = response;
          } else {
            // Delete all schedule transaction details associated with this account
            // since new deatils were generated
            var details = _rock.api.get.sync("FinancialScheduledTransactionDetails?$filter=ScheduledTransactionId eq " + ScheduledTransactionId);
            for (var _iterator = details, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
              var _ref;

              if (_isArray) {
                if (_i >= _iterator.length) break;
                _ref = _iterator[_i++];
              } else {
                _i = _iterator.next();
                if (_i.done) break;
                _ref = _i.value;
              }

              var oldSchedule = _ref;

              var success = _rock.api["delete"].sync("FinancialScheduledTransactionDetails/" + oldSchedule.Id);
            }
          }
        } else {
          ScheduledTransactionId = _rock.api.post.sync("FinancialScheduledTransactions", ScheduledTransaction);
        }

        if (ScheduledTransactionId.status) {
          return;
        }

        // Create ScheduledTransactionDetails
        for (var _iterator2 = ScheduledTransactionDetails, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
          var _ref2;

          if (_isArray2) {
            if (_i2 >= _iterator2.length) break;
            _ref2 = _iterator2[_i2++];
          } else {
            _i2 = _iterator2.next();
            if (_i2.done) break;
            _ref2 = _i2.value;
          }

          var ScheduledTransactionDetail = _ref2;

          ScheduledTransactionDetail = (0, _extends3["default"])({}, ScheduledTransactionDetail, {
            AccountId: ScheduledTransactionDetail.AccountId,
            Amount: ScheduledTransactionDetail.Amount,
            Guid: (0, _guid.makeNewGuid)(),
            ScheduledTransactionId: ScheduledTransactionId,
            CreatedByPersonAliasId: PrimaryAliasId,
            ModifiedByPersonAliasId: PrimaryAliasId
          });

          _rock.api.post.sync("FinancialScheduledTransactionDetails", ScheduledTransactionDetail);
        }

        if (FinancialPersonSavedAccounts && FinancialPersonSavedAccounts.ReferenceNumber) {
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

          _rock.api.post.sync("FinancialPersonSavedAccounts", FinancialPersonSavedAccounts);
        }

        if (ScheduledTransactionId && !ScheduledTransactionId.statusText) {
          // remove record
          _scheduledTransactions.ScheduledTransactionReciepts.remove(_id);
        }
      }
    });
  }
};

exports["default"] = ScheduledTransactions;
module.exports = exports['default'];