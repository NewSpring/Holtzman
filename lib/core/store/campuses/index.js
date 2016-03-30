"use strict";

exports.__esModule = true;

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _createReducer;

var _utilities = require("../utilities");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var initial = {
  campuses: {}
};

var reducer = (0, _utilities.createReducer)(initial, (_createReducer = {}, _createReducer["CAMPUSES.ADD"] = function CAMPUSESADD(state, action) {

  return (0, _extends3["default"])({}, state, {
    campuses: (0, _extends3["default"])({}, state.campuses, action.campuses)
  });
}, _createReducer));

(0, _utilities.addReducer)({
  campuses: reducer
});

exports["default"] = {
  add: function add(campuses) {
    return { type: "CAMPUSES.ADD", campuses: campuses };
  }

};
module.exports = exports['default'];