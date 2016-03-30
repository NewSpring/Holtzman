"use strict";

exports.__esModule = true;

var _reducer = require("./reducer");

var _reducer2 = _interopRequireDefault(_reducer);

var _saga = require("./saga");

var _saga2 = _interopRequireDefault(_saga);

var _utilities = require("../utilities");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

(0, _utilities.addReducer)({
  share: _reducer2["default"]
}); /*
    
    
      Share action types
    
    
    */


exports["default"] = {
  set: function set(content) {
    return { type: "SHARE.SET", content: content };
  },

  share: function share() {
    return { type: "SHARE.SHARE" };
  }
};
module.exports = exports['default'];