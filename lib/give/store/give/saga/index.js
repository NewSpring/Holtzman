"use strict";

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

require("regenerator-runtime/runtime");

var _reactDom = require("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _moment = require("moment");

var _moment2 = _interopRequireDefault(_moment);

var _effects = require("redux-saga/effects");

var _graphql = require("../../../../core/graphql");

var _utilities = require("../../../../core/store/utilities");

var _modal = require("../../../../core/store/modal");

var _modal2 = _interopRequireDefault(_modal);

var _collections = require("../../../../core/store/collections");

var _collections2 = _interopRequireDefault(_collections);

var _rock = require("../../../../core/util/rock");

var _types = require("./../types");

var _types2 = _interopRequireDefault(_types);

var _actions = require("../actions");

var _actions2 = _interopRequireDefault(_actions);

var _paymentForm = require("./paymentForm");

var _formatPersonDetails = require("./formatPersonDetails");

var _formatPersonDetails2 = _interopRequireDefault(_formatPersonDetails);

var _client = require("../../../methods/give/client");

var _RecoverSchedules = require("../../../blocks/RecoverSchedules");

var _RecoverSchedules2 = _interopRequireDefault(_RecoverSchedules);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _marked = [validate, submitPaymentDetails, submitPersonDetails, recoverTransactions].map(_regenerator2["default"].mark);

// at this point in time we have to do steps 1 - 3 of the
// three step process to create a validation response
// this validation process is required to ensure that the account
// that is being used to make payments, is actually valid
// see https://github.com/NewSpring/Apollos/issues/439 for discussion
function validate(getStore) {
  var _getStore, give, campuses, name, success, validationError, transactionResponse, modifiedGive, formattedData, error, url, response, token;

  return _regenerator2["default"].wrap(function validate$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _getStore = getStore();
          give = _getStore.give;
          campuses = _getStore.campuses;
          name = give.data.payment.name;
          success = true, validationError = false, transactionResponse = void 0;

          // we strip all product and schedule data so the validation is
          // just of the personal details + billing address

          modifiedGive = (0, _extends3["default"])({}, give);

          delete modifiedGive.transactions;
          delete modifiedGive.schedules;

          // step 1 (sumbit personal details)
          // personal info is ready to be submitted
          formattedData = (0, _formatPersonDetails2["default"])(modifiedGive, campuses);

          // in order to make this a validation call, we need to set the amount
          // to be 9

          formattedData.amount = 0;

          error = void 0, url = void 0;
          _context.prev = 11;
          _context.next = 14;
          return (0, _effects.cps)(_client.order, formattedData);

        case 14:
          response = _context.sent;

          url = response.url;

          _context.next = 21;
          break;

        case 18:
          _context.prev = 18;
          _context.t0 = _context["catch"](11);
          error = _context.t0;

        case 21:
          _context.next = 23;
          return submitPaymentDetails(modifiedGive.data, url);

        case 23:
          if (!url) {
            _context.next = 37;
            break;
          }

          // step 3 (trigger validation)
          token = url.split("/").pop();
          _context.prev = 25;
          _context.next = 28;
          return (0, _effects.cps)(_client.charge, token, name, null);

        case 28:
          transactionResponse = _context.sent;
          _context.next = 35;
          break;

        case 31:
          _context.prev = 31;
          _context.t1 = _context["catch"](25);

          validationError = _context.t1;
          success = false;

        case 35:
          _context.next = 39;
          break;

        case 37:
          success = false;
          validationError = error;

        case 39:
          return _context.abrupt("return", {
            success: success,
            validationError: validationError
          });

        case 40:
        case "end":
          return _context.stop();
      }
    }
  }, _marked[0], this, [[11, 18], [25, 31]]);
}

// handle the transactions
(0, _utilities.addSaga)(_regenerator2["default"].mark(function chargeTransaction(getStore) {
  var _this = this;

  var _ref, state, _getStore2, give, campuses, name, action, error, id;

  return _regenerator2["default"].wrap(function chargeTransaction$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          if (!true) {
            _context3.next = 16;
            break;
          }

          _context3.next = 3;
          return (0, _effects.take)(_types2["default"].SET_STATE);

        case 3:
          _ref = _context3.sent;
          state = _ref.state;
          _getStore2 = getStore();
          give = _getStore2.give;
          campuses = _getStore2.campuses;
          name = give.data.payment.name;
          action = _client.charge;
          error = false;
          id = void 0;

          if (!(state === "submit")) {
            _context3.next = 14;
            break;
          }

          return _context3.delegateYield(_regenerator2["default"].mark(function _callee() {
            var formattedData, store, _ref2, url, token, _ref3,
            // saved accounts don't validate the payment by default
            // so we make 3 blocking requests to validate the card :(
            success, validationError, transactionResponse, delay, query, _ref4, paymentDetails;

            return _regenerator2["default"].wrap(function _callee$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    _context2.next = 2;
                    return (0, _effects.put)(_actions2["default"].loading());

                  case 2:

                    // personal info is ready to be submitted
                    formattedData = (0, _formatPersonDetails2["default"])(give, campuses);

                    // if you have a saved account, NMI lets you "order" a schedule
                    // instead of order + charge

                    if (!(formattedData.savedAccount && Object.keys(give.schedules).length)) {
                      _context2.next = 7;
                      break;
                    }

                    // wrap the function for the same api
                    action = function action(token, name, id, callback) {
                      Meteor.call("give/order", formattedData, true, id, callback);
                    };

                    _context2.next = 19;
                    break;

                  case 7:
                    store = getStore();

                    give = store.give;

                    if (!formattedData.savedAccount) {
                      _context2.next = 11;
                      break;
                    }

                    return _context2.delegateYield(submitPersonDetails(give, campuses, true), "t0", 11);

                  case 11:

                    store = getStore();
                    give = store.give;

                    // wait until we have the transaction url

                    if (give.url) {
                      _context2.next = 19;
                      break;
                    }

                    _context2.next = 16;
                    return (0, _effects.take)(_types2["default"].SET_TRANSACTION_DETAILS);

                  case 16:
                    _ref2 = _context2.sent;
                    url = _ref2.url;

                    give.url = url;

                  case 19:

                    // get the token and name of the saved account
                    token = give.url.split("/").pop();

                    if (!Object.keys(give.schedules).length) {
                      _context2.next = 29;
                      break;
                    }

                    if (formattedData.savedAccount) {
                      _context2.next = 29;
                      break;
                    }

                    action = _client.schedule;

                    if (!(give.data.payment.type === "cc")) {
                      _context2.next = 29;
                      break;
                    }

                    return _context2.delegateYield(validate(getStore), "t1", 25);

                  case 25:
                    _ref3 = _context2.t1;
                    success = _ref3.success;
                    validationError = _ref3.validationError;


                    if (validationError) {
                      error = validationError;
                    }

                  case 29:

                    if (give.scheduleToRecover && Object.keys(give.schedules).length) {
                      id = give.scheduleToRecover;
                    }

                    transactionResponse = {};
                    // submit transaction

                    _context2.prev = 31;

                    if (error) {
                      _context2.next = 36;
                      break;
                    }

                    _context2.next = 35;
                    return (0, _effects.cps)(action, token, name, id);

                  case 35:
                    transactionResponse = _context2.sent;

                  case 36:
                    _context2.next = 41;
                    break;

                  case 38:
                    _context2.prev = 38;
                    _context2.t2 = _context2["catch"](31);
                    error = _context2.t2;

                  case 41:
                    if (!error) {
                      _context2.next = 48;
                      break;
                    }

                    _context2.next = 44;
                    return (0, _effects.put)(_actions2["default"].error({ transaction: error }));

                  case 44:
                    _context2.next = 46;
                    return (0, _effects.put)(_actions2["default"].setState("error"));

                  case 46:
                    _context2.next = 67;
                    break;

                  case 48:
                    _context2.next = 50;
                    return (0, _effects.put)(_actions2["default"].setState("success"));

                  case 50:
                    if (!(give.scheduleToRecover && give.recoverableSchedules[give.scheduleToRecover])) {
                      _context2.next = 55;
                      break;
                    }

                    _context2.next = 53;
                    return (0, _effects.put)(_actions2["default"].deleteSchedule(give.scheduleToRecover));

                  case 53:
                    _context2.next = 55;
                    return (0, _effects.put)(_actions2["default"].deleteRecoverableSchedules(give.scheduleToRecover));

                  case 55:
                    if (!name) {
                      _context2.next = 67;
                      break;
                    }

                    delay = function delay(ms) {
                      return new Promise(function (resolve) {
                        return setTimeout(resolve, ms);
                      });
                    };

                    query = "\n            {\n              paymentDetails: allSavedPaymentAccounts(cache: false, mongoId: \"" + Meteor.userId() + "\") {\n                name\n                id\n                date\n                payment {\n                  accountNumber\n                  paymentType\n                }\n              }\n            }\n          ";

                    // wait one second before calling this

                    _context2.next = 60;
                    return (0, _effects.call)(delay, 1000);

                  case 60:
                    _context2.next = 62;
                    return _graphql.GraphQL.query(query);

                  case 62:
                    _ref4 = _context2.sent;
                    paymentDetails = _ref4.paymentDetails;

                    if (!(paymentDetails && paymentDetails.length)) {
                      _context2.next = 67;
                      break;
                    }

                    _context2.next = 67;
                    return (0, _effects.put)(_collections2["default"].upsertBatch("savedAccounts", paymentDetails, "id"));

                  case 67:
                  case "end":
                    return _context2.stop();
                }
              }
            }, _callee, _this, [[31, 38]]);
          })(), "t0", 14);

        case 14:
          _context3.next = 0;
          break;

        case 16:
        case "end":
          return _context3.stop();
      }
    }
  }, chargeTransaction, this);
}));

function submitPaymentDetails(data, url) {
  var form, Component, obj, payment, personal, FieldSet;
  return _regenerator2["default"].wrap(function submitPaymentDetails$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          form = document.createElement("FORM");
          Component = void 0, obj = void 0;
          payment = data.payment;
          personal = data.personal;

          // format data and select component

          if (payment.type === "ach") {
            obj = {
              name: personal.firstName + " " + personal.lastName,
              account: payment.accountNumber,
              routing: payment.routingNumber,
              type: payment.accountType
            };

            Component = _paymentForm.AchForm;
          } else {
            obj = {
              number: payment.cardNumber,
              exp: payment.expiration,
              ccv: payment.ccv
            };

            Component = _paymentForm.CreditCardForm;
          }

          // create the fieldset
          FieldSet = React.createElement(Component, (0, _extends3["default"])({}, obj));
          // add fieldset to non rendered form

          _reactDom2["default"].render(FieldSet, form);

          // @TODO test on older browsers
          // store data in NMI's system
          return _context4.abrupt("return", fetch(url, {
            method: "POST",
            body: new FormData(form),
            mode: "no-cors"
          }).then(function (response) {
            // next()

          })["catch"](function (e) {
            // @TODO error handling
          }));

        case 8:
        case "end":
          return _context4.stop();
      }
    }
  }, _marked[1], this);
}

function submitPersonDetails(give, campuses, autoSubmit) {
  var formattedData, error, url, response, _response;

  return _regenerator2["default"].wrap(function submitPersonDetails$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:

          // personal info is ready to be submitted
          formattedData = (0, _formatPersonDetails2["default"])(give, campuses);

          /*
             Oddity with NMI, when using a saved account for a subscription,
            you only submit the order, not the charge, etc
           */

          if (!(formattedData.savedAccount && Object.keys(give.schedules).length)) {
            _context5.next = 3;
            break;
          }

          return _context5.abrupt("return");

        case 3:
          error = void 0, url = void 0;
          _context5.prev = 4;
          _context5.next = 7;
          return (0, _effects.cps)(_client.order, formattedData);

        case 7:
          response = _context5.sent;

          url = response.url;

          _context5.next = 14;
          break;

        case 11:
          _context5.prev = 11;
          _context5.t0 = _context5["catch"](4);
          error = _context5.t0;

        case 14:
          if (!autoSubmit) {
            _context5.next = 18;
            break;
          }

          _context5.next = 17;
          return fetch(url, {
            method: "POST",
            body: new FormData(),
            mode: "no-cors"
          }).then(function (response) {})["catch"](function (e) {});

        case 17:
          _response = _context5.sent;

        case 18:
          _context5.next = 20;
          return (0, _effects.put)(_actions2["default"].setDetails(url));

        case 20:
          return _context5.abrupt("return", _context5.sent);

        case 21:
        case "end":
          return _context5.stop();
      }
    }
  }, _marked[2], this, [[4, 11]]);
}

// transaction processing flow controller
(0, _utilities.addSaga)(_regenerator2["default"].mark(function createOrder(getStore) {
  var _ref5,

  /*
     steps to give
     Full Steps
    1. add person data
    2. submit person data to NMI
    3. get back transaction code
    4. submit payment details to NMI
    5. process transaction
    6. handle success / errors
     Saved Account
    1. submit person code to NMI
    2. get back transaction code
    3. process transaction
    4. handle success / errors
   */
  step, _getStore3, give, campuses;

  return _regenerator2["default"].wrap(function createOrder$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          if (!true) {
            _context6.next = 17;
            break;
          }

          _context6.next = 3;
          return (0, _effects.take)(_types2["default"].SET_PROGRESS);

        case 3:
          _ref5 = _context6.sent;
          step = _ref5.step;
          _getStore3 = getStore();
          give = _getStore3.give;
          campuses = _getStore3.campuses;

          if (!(give.step - 1 === 2)) {
            _context6.next = 12;
            break;
          }

          return _context6.delegateYield(submitPersonDetails(give, campuses, false), "t0", 10);

        case 10:
          _context6.next = 15;
          break;

        case 12:
          if (!(give.step - 1 === 3)) {
            _context6.next = 15;
            break;
          }

          _context6.next = 15;
          return submitPaymentDetails(give.data, give.url);

        case 15:
          _context6.next = 0;
          break;

        case 17:
        case "end":
          return _context6.stop();
      }
    }
  }, createOrder, this);
}));

/*


  During the transition from F1 to Rock, we have schedules that need
  to be recovered from our imported data

  The criteria for a `recoverable schedule` is the following:
    IsActive (active: false on GQL query) === false
    GatewayCode (gateway on GQL) === null

  When the schedule is reactivated, the GatewayCode is set and it is set back
  to active.

  If the schedule is canceled permantly, and it doesn't have a GatewayCode,
  it is safe to delete it as no auditable information exists.

*/

// recover transactions
function recoverTransactions(getStore) {
  var user, _ref6, authorized, query, _ref7, schedules, bulkUpdate, _iterator, _isArray, _i, _ref8, _schedule, store, time, now, state, pathname;

  return _regenerator2["default"].wrap(function recoverTransactions$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          user = Meteor.userId();

          if (user) {
            _context7.next = 6;
            break;
          }

          _context7.next = 4;
          return (0, _effects.take)("ACCOUNTS.IS_AUTHORIZED");

        case 4:
          _ref6 = _context7.sent;
          authorized = _ref6.authorized;

        case 6:

          user = Meteor.user();

          if (!(user && user.profile && user.profile.reminderDate)) {
            _context7.next = 10;
            break;
          }

          _context7.next = 10;
          return (0, _effects.put)(_actions2["default"].setReminder(user.profile.reminderDate));

        case 10:
          query = "\n    query ScheduledTransactions($mongoId: String) {\n      schedules: allScheduledFinanicalTransactions(mongoId: $mongoId, active: false, cache: false) {\n        id\n        gateway\n        start\n        next\n        details {\n          amount\n          account {\n            name\n            id\n            description\n          }\n        }\n        schedule {\n          value\n          description\n        }\n      }\n    }\n  ";
          _context7.next = 13;
          return _graphql.GraphQL.query(query);

        case 13:
          _ref7 = _context7.sent;
          schedules = _ref7.schedules;
          bulkUpdate = {};

          schedules = schedules.filter(function (x) {
            return !x.gateway;
          });

          if (!schedules.length) {
            _context7.next = 51;
            break;
          }

          _iterator = schedules, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();

        case 19:
          if (!_isArray) {
            _context7.next = 25;
            break;
          }

          if (!(_i >= _iterator.length)) {
            _context7.next = 22;
            break;
          }

          return _context7.abrupt("break", 36);

        case 22:
          _ref8 = _iterator[_i++];
          _context7.next = 29;
          break;

        case 25:
          _i = _iterator.next();

          if (!_i.done) {
            _context7.next = 28;
            break;
          }

          return _context7.abrupt("break", 36);

        case 28:
          _ref8 = _i.value;

        case 29:
          _schedule = _ref8;

          if (!_schedule.gateway) {
            _context7.next = 32;
            break;
          }

          return _context7.abrupt("continue", 34);

        case 32:

          if (_schedule.schedule.value === "Twice a Month") {
            _schedule.schedule.value = null;
          }
          bulkUpdate[_schedule.id] = (0, _extends3["default"])({
            start: (0, _moment2["default"])(_schedule.start).format("YYYYMMDD"),
            frequency: _schedule.schedule.value
          }, _schedule);

        case 34:
          _context7.next = 19;
          break;

        case 36:
          store = getStore();
          time = new Date();

          if (user && user.profile && user.profile.reminderDate) {
            time = user.profile.reminderDate;
          }
          now = new Date();
          _context7.next = 42;
          return (0, _effects.put)(_actions2["default"].saveSchedules(bulkUpdate));

        case 42:
          if (!(now < time)) {
            _context7.next = 44;
            break;
          }

          return _context7.abrupt("return");

        case 44:
          state = getStore();
          pathname = state.routing.location.pathname;

          if (!(pathname.split("/").length === 4 && pathname.split("/")[3] === "recover")) {
            _context7.next = 48;
            break;
          }

          return _context7.abrupt("return");

        case 48:
          if (!Meteor.isClient) {
            _context7.next = 51;
            break;
          }

          _context7.next = 51;
          return (0, _effects.put)(_modal2["default"].render(_RecoverSchedules2["default"]));

        case 51:
        case "end":
          return _context7.stop();
      }
    }
  }, _marked[3], this);
}

// ensure we are on a /give route
(0, _utilities.addSaga)(_regenerator2["default"].mark(function watchRoute(getStore) {
  var _this2 = this;

  var _loop, _ret2;

  return _regenerator2["default"].wrap(function watchRoute$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          _loop = _regenerator2["default"].mark(function _loop() {
            var state, pathname, recovered, isGive, _ref9, payload;

            return _regenerator2["default"].wrap(function _loop$(_context8) {
              while (1) {
                switch (_context8.prev = _context8.next) {
                  case 0:
                    isGive = function isGive(path) {
                      return path.split("/")[1] === "give";
                    };

                    state = getStore();
                    pathname = state.routing.location.pathname;
                    recovered = void 0;

                    if (isGive(pathname)) {
                      _context8.next = 15;
                      break;
                    }

                    _context8.next = 7;
                    return (0, _effects.take)("@@router/UPDATE_LOCATION");

                  case 7:
                    _ref9 = _context8.sent;
                    payload = _ref9.payload;

                    if (!isGive(payload.pathname)) {
                      _context8.next = 13;
                      break;
                    }

                    return _context8.delegateYield(recoverTransactions(getStore), "t0", 11);

                  case 11:
                    recovered = _context8.t0;
                    return _context8.abrupt("return", "break");

                  case 13:
                    _context8.next = 18;
                    break;

                  case 15:
                    return _context8.delegateYield(recoverTransactions(getStore), "t1", 16);

                  case 16:
                    recovered = _context8.t1;
                    return _context8.abrupt("return", "break");

                  case 18:
                  case "end":
                    return _context8.stop();
                }
              }
            }, _loop, _this2);
          });

        case 1:
          if (!true) {
            _context9.next = 8;
            break;
          }

          return _context9.delegateYield(_loop(), "t0", 3);

        case 3:
          _ret2 = _context9.t0;

          if (!(_ret2 === "break")) {
            _context9.next = 6;
            break;
          }

          return _context9.abrupt("break", 8);

        case 6:
          _context9.next = 1;
          break;

        case 8:
        case "end":
          return _context9.stop();
      }
    }
  }, watchRoute, this);
}));

// clear out data on user change
(0, _utilities.addSaga)(_regenerator2["default"].mark(function bindGiveAuth(geStore) {
  var _ref10, authorized;

  return _regenerator2["default"].wrap(function bindGiveAuth$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          if (!true) {
            _context10.next = 10;
            break;
          }

          _context10.next = 3;
          return (0, _effects.take)("ACCOUNTS.IS_AUTHORIZED");

        case 3:
          _ref10 = _context10.sent;
          authorized = _ref10.authorized;

          if (authorized) {
            _context10.next = 8;
            break;
          }

          _context10.next = 8;
          return (0, _effects.put)(_actions2["default"].clearData());

        case 8:
          _context10.next = 0;
          break;

        case 10:
        case "end":
          return _context10.stop();
      }
    }
  }, bindGiveAuth, this);
}));