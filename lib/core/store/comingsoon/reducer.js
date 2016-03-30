"use strict";

exports.__esModule = true;

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _createReducer; /*
                    
                      Coming soon store
                    
                    */

var _utilities = require("../utilities");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var initial = {
  active: false
};

exports["default"] = (0, _utilities.createReducer)(initial, (_createReducer = {}, _createReducer["COMINGSOON.TOGGLE"] = function COMINGSOONTOGGLE(state, action) {
  return (0, _extends3["default"])({}, state, {
    active: !state.active
  });
}, _createReducer));
module.exports = exports['default'];