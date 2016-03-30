"use strict";

exports.__esModule = true;

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _createReducer; /*
                    
                      Filters store
                    
                    */

var _utilities = require("../utilities");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var initial = {
  campus: null
};

exports["default"] = (0, _utilities.createReducer)(initial, (_createReducer = {}, _createReducer["FILTERS.SET"] = function FILTERSSET(state, action) {
  var newState = (0, _extends3["default"])({}, state);
  newState[action.content.filter] = action.content.value;
  return newState;
}, _createReducer));
module.exports = exports['default'];