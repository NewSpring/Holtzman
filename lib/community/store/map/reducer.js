"use strict";

var _extends3 = require("babel-runtime/helpers/extends");

var _extends4 = _interopRequireDefault(_extends3);

var _createReducer;

var _utilities = require("../../../core/store/utilities");

var _types = require("./types");

var _types2 = _interopRequireDefault(_types);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var initial = {
  visible: false,
  state: "default" };

// "full"
var reducer = (0, _utilities.createReducer)(initial, (_createReducer = {}, _createReducer[_types2["default"].INSERT] = function (state, action) {
  var _extends2;

  return (0, _extends4["default"])({}, state, (_extends2 = {}, _extends2[action.collection] = (0, _extends4["default"])({}, state[action.collection], action.data), _extends2));
}, _createReducer));

(0, _utilities.addReducer)({
  map: reducer
});