"use strict";

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

require("regenerator-runtime/runtime");

var _effects = require("redux-saga/effects");

var _utilities = require("../utilities");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

(0, _utilities.addSaga)(_regenerator2["default"].mark(function share(getStore) {
  var _ref, payload, _getStore, _share, msg, key;

  return _regenerator2["default"].wrap(function share$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (!true) {
            _context.next = 15;
            break;
          }

          _context.next = 3;
          return (0, _effects.take)("SHARE.SHARE");

        case 3:
          _ref = _context.sent;
          payload = _ref.payload;
          _getStore = getStore();
          _share = _getStore.share;
          msg = {};


          for (key in _share.content) {
            if (_share.content[key] != null) {
              msg[key] = _share.content[key];
            }
          }

          // this is a temporary speed bump
          if (msg.image) {
            delete msg.image;
          }

          if (typeof window != "undefined" && window != null && window.socialmessage && Object.keys(msg).length) {

            if (msg.image && msg.image[0] === "/") {
              msg.image = "http:" + msg.image;
            }

            window.socialmessage.send(msg);
          }

          _context.next = 13;
          return (0, _effects.put)({ type: "SHARE.SHARE" });

        case 13:
          _context.next = 0;
          break;

        case 15:
        case "end":
          return _context.stop();
      }
    }
  }, share, this);
}));