"use strict";

exports.__esModule = true;

var _reducer = require("./reducer");

var _reducer2 = _interopRequireDefault(_reducer);

var _utilities = require("../utilities");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/*


  Search action types

  SEARCH.SET_TERM
    set the term to search for

  SEARCH.ADD
    add to the store of search items

  SEARCH.CLEAR
    clear the current items in the store and the page

  SEARCH.INCREMENT_PAGE
    set the current page

  SEARCH.TOGGLE_LOADING
    toggle loading state

  SEARCH.DONE
    set paging is done

  SEARCH.NONE
    set status to no items

  SEARCHING.SEARCHING
    toggle between discover topics and search results

*/


(0, _utilities.addReducer)({
  search: _reducer2["default"]
});

exports["default"] = {
  term: function term(_term) {
    return { type: "SEARCH.SET_TERM", term: _term };
  },

  add: function add(items) {
    return { type: "SEARCH.ADD", items: items };
  },
  clear: function clear() {
    return { type: "SEARCH.CLEAR" };
  },

  incrementPage: function incrementPage() {
    return { type: "SEARCH.INCREMENT_PAGE" };
  },

  toggleLoading: function toggleLoading() {
    return { type: "SEARCH.TOGGLE_LOADING" };
  },

  done: function done(_done) {
    return { type: "SEARCH.DONE", done: _done };
  },
  none: function none(_none) {
    return { type: "SEARCH.NONE", none: _none };
  },

  searching: function searching(_searching) {
    return { type: "SEARCH.SEARCHING", searching: _searching };
  }
};
module.exports = exports['default'];