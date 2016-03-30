"use strict";

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

require("regenerator-runtime/runtime");

var _effects = require("redux-saga/effects");

var _graphql = require("../../graphql");

var _methods = require("../../methods");

var _utilities = require("../utilities");

var _actions = require("./actions");

var _actions2 = _interopRequireDefault(_actions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _marked = [login, signup].map(_regenerator2["default"].mark);

// Check for availibilty of account
(0, _utilities.addSaga)(_regenerator2["default"].mark(function checkAccount(getState) {
  var _ref,

  // wait for the email field to be blurred
  data, email, _ref2,
  // make call to Rock to check if account is open
  isAvailable, alternateAccounts, peopleWithoutAccountEmails;

  return _regenerator2["default"].wrap(function checkAccount$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (!true) {
            _context.next = 21;
            break;
          }

          _context.next = 3;
          return (0, _effects.take)("ACCOUNTS.SET_DATA");

        case 3:
          _ref = _context.sent;
          data = _ref.data;
          email = data.email;

          // if the event was triggered by email check to see if it available

          if (!email) {
            _context.next = 19;
            break;
          }

          _context.next = 9;
          return (0, _effects.cps)(_methods.accounts.available, email);

        case 9:
          _ref2 = _context.sent;
          isAvailable = _ref2.isAvailable;
          alternateAccounts = _ref2.alternateAccounts;
          peopleWithoutAccountEmails = _ref2.peopleWithoutAccountEmails;

          // end the run of this saga iteration by setting account

          _context.next = 15;
          return (0, _effects.put)(_actions2["default"].setAccount(!isAvailable));

        case 15:
          _context.next = 17;
          return (0, _effects.put)(_actions2["default"].setAlternateAccounts(alternateAccounts));

        case 17:
          _context.next = 19;
          return (0, _effects.put)(_actions2["default"].peopleWithoutAccountEmails(peopleWithoutAccountEmails));

        case 19:
          _context.next = 0;
          break;

        case 21:
        case "end":
          return _context.stop();
      }
    }
  }, checkAccount, this);
}));

(0, _utilities.addSaga)(_regenerator2["default"].mark(function completeAccount(getState) {
  var state, _state$accounts$data, email, personId, created, error;

  return _regenerator2["default"].wrap(function completeAccount$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          if (!true) {
            _context2.next = 37;
            break;
          }

          _context2.next = 3;
          return (0, _effects.take)("ACCOUNTS.COMPLETE_ACCOUNT");

        case 3:
          state = getState();
          _state$accounts$data = state.accounts.data;
          email = _state$accounts$data.email;
          personId = _state$accounts$data.personId;
          created = false, error = void 0;

          if (!(email && personId)) {
            _context2.next = 35;
            break;
          }

          _context2.next = 11;
          return (0, _effects.put)(_actions2["default"].loading());

        case 11:
          _context2.prev = 11;
          _context2.next = 14;
          return (0, _effects.cps)(_methods.accounts.recover, email, personId);

        case 14:
          created = _context2.sent;
          _context2.next = 20;
          break;

        case 17:
          _context2.prev = 17;
          _context2.t0 = _context2["catch"](11);

          error = _context2.t0;

        case 20:
          if (!created) {
            _context2.next = 25;
            break;
          }

          _context2.next = 23;
          return (0, _effects.put)(_actions2["default"].setState("default"));

        case 23:
          _context2.next = 35;
          break;

        case 25:
          _context2.next = 27;
          return (0, _effects.put)(_actions2["default"].error({ "password": error }));

        case 27:
          _context2.next = 29;
          return (0, _effects.put)(_actions2["default"].resetAccount());

        case 29:
          _context2.next = 31;
          return (0, _effects.put)(_actions2["default"].authorize(false));

        case 31:
          _context2.next = 33;
          return (0, _effects.put)(_actions2["default"].fail());

        case 33:
          _context2.next = 35;
          return (0, _effects.put)(_actions2["default"].setState("default"));

        case 35:
          _context2.next = 0;
          break;

        case 37:
        case "end":
          return _context2.stop();
      }
    }
  }, completeAccount, this, [[11, 17]]);
}));

function login(getState) {
  var currentState, _currentState$account, data, state, email, password, isAuthorized, result;

  return _regenerator2["default"].wrap(function login$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          currentState = getState();
          _currentState$account = currentState.accounts;
          data = _currentState$account.data;
          state = _currentState$account.state;

          if (!(data.email && data.password)) {
            _context3.next = 27;
            break;
          }

          email = data.email;
          password = data.password;

          // set the UI to show the loading screen

          _context3.next = 9;
          return (0, _effects.put)(_actions2["default"].loading());

        case 9:
          _context3.prev = 9;
          _context3.next = 12;
          return (0, _effects.cps)(_methods.accounts.login, email, password);

        case 12:
          isAuthorized = _context3.sent;

          if (!isAuthorized) {
            _context3.next = 22;
            break;
          }

          _context3.next = 16;
          return (0, _effects.cps)(Meteor.loginWithPassword, email, password);

        case 16:
          result = _context3.sent;

          if (!isAuthorized) {
            _context3.next = 21;
            break;
          }

          return _context3.abrupt("return", { result: isAuthorized });

        case 21:
          return _context3.abrupt("return", { error: new Meteor.Error("An unkown error occured") });

        case 22:
          _context3.next = 27;
          break;

        case 24:
          _context3.prev = 24;
          _context3.t0 = _context3["catch"](9);
          return _context3.abrupt("return", { error: _context3.t0 });

        case 27:
        case "end":
          return _context3.stop();
      }
    }
  }, _marked[0], this, [[9, 24]]);
}

function signup(getState) {
  var currentState, _currentState$account2, data, state, d, email, password, isAuthorized, result;

  return _regenerator2["default"].wrap(function signup$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          currentState = getState();
          _currentState$account2 = currentState.accounts;
          data = _currentState$account2.data;
          state = _currentState$account2.state;

          // shorthand for 80 ch limit

          d = data;

          if (!(d.email && d.password && d.firstName && d.lastName && d.terms)) {
            _context4.next = 28;
            break;
          }

          email = data.email;
          password = data.password;

          // set the UI to show the loading screen

          _context4.next = 10;
          return (0, _effects.put)(_actions2["default"].loading());

        case 10:
          _context4.prev = 10;
          _context4.next = 13;
          return (0, _effects.cps)(_methods.accounts.signup, data);

        case 13:
          isAuthorized = _context4.sent;

          if (!isAuthorized) {
            _context4.next = 23;
            break;
          }

          _context4.next = 17;
          return (0, _effects.cps)(Meteor.loginWithPassword, email, password);

        case 17:
          result = _context4.sent;

          if (!isAuthorized) {
            _context4.next = 22;
            break;
          }

          return _context4.abrupt("return", { result: isAuthorized });

        case 22:
          return _context4.abrupt("return", { error: new Meteor.Error("An unkown error occured") });

        case 23:
          _context4.next = 28;
          break;

        case 25:
          _context4.prev = 25;
          _context4.t0 = _context4["catch"](10);
          return _context4.abrupt("return", { error: _context4.t0 });

        case 28:
        case "end":
          return _context4.stop();
      }
    }
  }, _marked[1], this, [[10, 25]]);
}

// handle accounts wordflow
(0, _utilities.addSaga)(_regenerator2["default"].mark(function account(getState) {
  var _this = this;

  var _ref3, state, currentState, returnValue, _returnValue, result, error;

  return _regenerator2["default"].wrap(function account$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          if (!true) {
            _context6.next = 32;
            break;
          }

          _context6.next = 3;
          return (0, _effects.take)("ACCOUNTS.SET_STATE");

        case 3:
          _ref3 = _context6.sent;
          state = _ref3.state;

          if (!(state === "submit")) {
            _context6.next = 30;
            break;
          }

          currentState = getState(), returnValue = false;

          if (!currentState.accounts.account) {
            _context6.next = 12;
            break;
          }

          return _context6.delegateYield(login(getState), "t0", 9);

        case 9:
          returnValue = _context6.t0;
          _context6.next = 14;
          break;

        case 12:
          return _context6.delegateYield(signup(getState), "t1", 13);

        case 13:
          returnValue = _context6.t1;

        case 14:
          if (!returnValue) {
            _context6.next = 30;
            break;
          }

          _returnValue = returnValue;
          result = _returnValue.result;
          error = _returnValue.error;

          if (!error) {
            _context6.next = 29;
            break;
          }

          _context6.next = 21;
          return (0, _effects.put)(_actions2["default"].error({ "password": error.error }));

        case 21:
          _context6.next = 23;
          return (0, _effects.put)(_actions2["default"].authorize(false));

        case 23:
          _context6.next = 25;
          return (0, _effects.put)(_actions2["default"].fail());

        case 25:
          _context6.next = 27;
          return (0, _effects.put)(_actions2["default"].setState("default"));

        case 27:
          _context6.next = 30;
          break;

        case 29:
          return _context6.delegateYield(_regenerator2["default"].mark(function _callee() {
            var personQuery, lookup, _ref4, person, user;

            return _regenerator2["default"].wrap(function _callee$(_context5) {
              while (1) {
                switch (_context5.prev = _context5.next) {
                  case 0:

                    // force fetch info
                    // @TODO figure out caching issues?
                    personQuery = "\n            {\n              person(mongoId: \"" + Meteor.userId() + "\", cache: false) {\n                age\n                birthdate\n                birthDay\n                birthMonth\n                birthYear\n                campus {\n                  name\n                  shortCode\n                  id\n                }\n                home {\n                  city\n                  country\n                  id\n                  zip\n                  state\n                  street1\n                  street2\n                }\n                firstName\n                lastName\n                nickName\n                email\n                phoneNumbers {\n                  number\n                  formated\n                }\n                photo\n              }\n            }\n          ";

                    lookup = function lookup() {
                      return _graphql.GraphQL.query(personQuery);
                    };

                    _context5.next = 4;
                    return (0, _effects.call)(lookup);

                  case 4:
                    _ref4 = _context5.sent;
                    person = _ref4.person;

                    if (!person) {
                      _context5.next = 9;
                      break;
                    }

                    _context5.next = 9;
                    return (0, _effects.put)(_actions2["default"].person(person));

                  case 9:
                    _context5.next = 11;
                    return (0, _effects.put)(_actions2["default"].authorize(true));

                  case 11:
                    _context5.next = 13;
                    return (0, _effects.put)(_actions2["default"].success());

                  case 13:
                    user = Meteor.user();

                    // if this is the first login, show welcome

                    if (!(!user || !user.profile || !user.profile.lastLogin)) {
                      _context5.next = 17;
                      break;
                    }

                    _context5.next = 17;
                    return (0, _effects.put)(_actions2["default"].showWelcome());

                  case 17:
                    _context5.next = 19;
                    return (0, _effects.put)(_actions2["default"].setState("default"));

                  case 19:

                    // update login time
                    Meteor.users.update(Meteor.userId(), {
                      $set: {
                        "profile.lastLogin": new Date()
                      }
                    });

                  case 20:
                  case "end":
                    return _context5.stop();
                }
              }
            }, _callee, _this);
          })(), "t2", 30);

        case 30:
          _context6.next = 0;
          break;

        case 32:
        case "end":
          return _context6.stop();
      }
    }
  }, account, this);
}));