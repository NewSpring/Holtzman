"use strict";

exports.__esModule = true;

var _utilities = require("../utilities");

var _actions = require("./actions");

var _actions2 = _interopRequireDefault(_actions);

var _reducer = require("./reducer");

var _reducer2 = _interopRequireDefault(_reducer);

require("./saga");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

(0, _utilities.addReducer)({
  accounts: _reducer2["default"]
});

exports["default"] = _actions2["default"];
module.exports = exports['default'];