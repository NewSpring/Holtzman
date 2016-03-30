"use strict";

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

require("regenerator-runtime/runtime");

var _effects = require("redux-saga/effects");

var _methods = require("../../methods");

var _utilities = require("../utilities");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

(0, _utilities.addSaga)(_regenerator2["default"].mark(function logInitRoute() {
  var user, title, url, _ref, payload;

  return _regenerator2["default"].wrap(function logInitRoute$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          user = Meteor.userId();


          if (user) {
            if (typeof window != "undefined" && window != null) {
              title = window.document.title, url = window.location.href;


              (0, _methods.routing)(url, title);
            }
          }

          _context.next = 4;
          return (0, _effects.take)("@@router/UPDATE_LOCATION");

        case 4:
          _ref = _context.sent;
          payload = _ref.payload;

        case 6:
        case "end":
          return _context.stop();
      }
    }
  }, logInitRoute, this);
}));

(0, _utilities.addSaga)(_regenerator2["default"].mark(function scrollToTop(getStore) {
  var _ref2, payload;

  return _regenerator2["default"].wrap(function scrollToTop$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          if (!true) {
            _context2.next = 8;
            break;
          }

          _context2.next = 3;
          return (0, _effects.take)("@@router/UPDATE_LOCATION");

        case 3:
          _ref2 = _context2.sent;
          payload = _ref2.payload;


          if (payload.action === "PUSH") {
            window.scrollTo(0, 0);
          }

          _context2.next = 0;
          break;

        case 8:
        case "end":
          return _context2.stop();
      }
    }
  }, scrollToTop, this);
}));

(0, _utilities.addSaga)(_regenerator2["default"].mark(function logRoutes(getStore) {
  var user, _ref3, payload, title, url;

  return _regenerator2["default"].wrap(function logRoutes$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          if (!true) {
            _context3.next = 9;
            break;
          }

          user = Meteor.userId();
          _context3.next = 4;
          return (0, _effects.take)("@@router/UPDATE_LOCATION");

        case 4:
          _ref3 = _context3.sent;
          payload = _ref3.payload;


          if (Meteor.userId()) {

            if (typeof window != "undefined" && window != null) {
              title = window.document.title, url = window.location.href;


              (0, _methods.routing)(url, title);
            }
          }

          _context3.next = 0;
          break;

        case 9:
        case "end":
          return _context3.stop();
      }
    }
  }, logRoutes, this);
}));