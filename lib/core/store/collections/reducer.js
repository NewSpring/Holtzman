"use strict";

var _extends5 = require("babel-runtime/helpers/extends");

var _extends6 = _interopRequireDefault(_extends5);

var _createReducer;

var _utilities = require("../utilities");

var _types = require("./types");

var _types2 = _interopRequireDefault(_types);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var reducer = (0, _utilities.createReducer)({}, (_createReducer = {}, _createReducer[_types2["default"].INSERT] = function (state, action) {
  var _extends2;

  return (0, _extends6["default"])({}, state, (_extends2 = {}, _extends2[action.collection] = (0, _extends6["default"])({}, state[action.collection], action.data), _extends2));
}, _createReducer[_types2["default"].INSERT_BATCH] = function (state, action) {
  var _extends3;

  var __raw = {};
  for (var _iterator = action.data, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
    var _ref;

    if (_isArray) {
      if (_i >= _iterator.length) break;
      _ref = _iterator[_i++];
    } else {
      _i = _iterator.next();
      if (_i.done) break;
      _ref = _i.value;
    }

    var entry = _ref;

    __raw[entry[action.key]] = entry;
  }

  return (0, _extends6["default"])({}, state, (_extends3 = {}, _extends3[action.collection] = (0, _extends6["default"])({}, state[action.collection], __raw), _extends3));
}, _createReducer[_types2["default"].CLEAR] = function (state, action) {
  var _extends4;

  return (0, _extends6["default"])({}, state, (_extends4 = {}, _extends4[action.collection] = {}, _extends4));
}, _createReducer[_types2["default"]["delete"]] = function (state, action) {
  var removedState = (0, _extends6["default"])({}, state);

  delete removedState[action.collection][action.id];

  return removedState;
}, _createReducer));

(0, _utilities.addReducer)({
  collections: reducer
});