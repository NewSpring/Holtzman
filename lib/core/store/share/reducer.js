"use strict";

exports.__esModule = true;

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _createReducer; /*
                    
                      Shared store
                    
                    */

var _utilities = require("../utilities");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var initial = {
  sharing: false,
  content: {
    subject: null,
    text: null,
    activityTypes: null,
    image: null,
    url: null
  }

};

exports["default"] = (0, _utilities.createReducer)(initial, (_createReducer = {}, _createReducer["SHARE.SHARE"] = function SHARESHARE(state, action) {

  return (0, _extends3["default"])({}, state, {
    sharing: !state.sharing
  });
}, _createReducer["SHARE.SET"] = function SHARESET(state, action) {
  return (0, _extends3["default"])({}, state, {
    content: (0, _extends3["default"])({}, state.content, action.content)
  });
}, _createReducer));
module.exports = exports['default'];