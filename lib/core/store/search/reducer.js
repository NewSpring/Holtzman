"use strict";

exports.__esModule = true;

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _createReducer; /*
                    
                      Search store
                    
                    */

var _utilities = require("../utilities");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var initial = {
  term: null,
  items: [],
  page: 0,
  pageSize: 10,
  loading: false,
  done: false,
  none: false,
  searching: false
};

exports["default"] = (0, _utilities.createReducer)(initial, (_createReducer = {}, _createReducer["SEARCH.SET_TERM"] = function SEARCHSET_TERM(state, action) {
  return (0, _extends3["default"])({}, state, {
    term: action.term
  });
}, _createReducer["SEARCH.ADD"] = function SEARCHADD(state, action) {
  return (0, _extends3["default"])({}, state, {
    items: [].concat(state.items, action.items)
  });
}, _createReducer["SEARCH.CLEAR"] = function SEARCHCLEAR(state, action) {
  return (0, _extends3["default"])({}, state, {
    items: [],
    page: 0,
    done: false,
    none: false
  });
}, _createReducer["SEARCH.INCREMENT_PAGE"] = function SEARCHINCREMENT_PAGE(state, action) {
  return (0, _extends3["default"])({}, state, {
    page: state.page + 1
  });
}, _createReducer["SEARCH.TOGGLE_LOADING"] = function SEARCHTOGGLE_LOADING(state, action) {
  return (0, _extends3["default"])({}, state, {
    loading: !state.loading
  });
}, _createReducer["SEARCH.DONE"] = function SEARCHDONE(state, action) {
  return (0, _extends3["default"])({}, state, {
    done: action.done
  });
}, _createReducer["SEARCH.NONE"] = function SEARCHNONE(state, action) {
  return (0, _extends3["default"])({}, state, {
    none: action.none
  });
}, _createReducer["SEARCH.SEARCHING"] = function SEARCHSEARCHING(state, action) {
  return (0, _extends3["default"])({}, state, {
    searching: action.searching,
    term: null
  });
}, _createReducer));
module.exports = exports['default'];