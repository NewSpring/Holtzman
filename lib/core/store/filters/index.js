"use strict";

exports.__esModule = true;

var _reducer = require("./reducer");

var _reducer2 = _interopRequireDefault(_reducer);

var _utilities = require("../utilities");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/*


  Groups action types

  FILTERS.SET
    set filter state

*/


(0, _utilities.addReducer)({
  filters: _reducer2["default"]
});

exports["default"] = {

  set: function set(content) {
    return { type: "FILTERS.SET", content: content };
  }

};
module.exports = exports['default'];