"use strict";

exports.__esModule = true;

var _Input = require("./Input");

var _Input2 = _interopRequireDefault(_Input);

var _Results = require("./Results");

var _Results2 = _interopRequireDefault(_Results);

var _feed = require("./feed");

var _feed2 = _interopRequireDefault(_feed);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Content = function Content(_ref) {
  var loadMore = _ref.loadMore;
  var search = _ref.search;


  if (search.searching) {
    return React.createElement(_Results2["default"], { loadMore: loadMore, search: search });
  } else {
    return React.createElement(_feed2["default"], null);
  }
};

var SearchLayout = function SearchLayout(_ref2) {
  var searchSubmit = _ref2.searchSubmit;
  var loadMore = _ref2.loadMore;
  var cancel = _ref2.cancel;
  var search = _ref2.search;
  var hide = _ref2.hide;
  return React.createElement(
    "section",
    { className: "hard" },
    React.createElement(_Input2["default"], { searchSubmit: searchSubmit, cancel: cancel, showCancel: search.searching }),
    React.createElement(Content, { loadMore: loadMore, search: search })
  );
};

exports["default"] = SearchLayout;
module.exports = exports['default'];