"use strict";

exports.__esModule = true;

var _Item = require("./Item");

var _Item2 = _interopRequireDefault(_Item);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var LoadingText = function LoadingText(_ref) {
  var search = _ref.search;

  if (search.loading) {
    return React.createElement(
      "span",
      null,
      "Loading..."
    );
  } else {
    return React.createElement(
      "span",
      null,
      "Load More Results"
    );
  }
};

var LoadMore = function LoadMore(_ref2) {
  var loadMore = _ref2.loadMore;
  var search = _ref2.search;

  if (!search.done) {
    return React.createElement(
      "div",
      { className: "text-center push-double-top" },
      React.createElement(
        "button",
        {
          className: "btn--dark-tertiary",
          onClick: loadMore
        },
        React.createElement(LoadingText, { search: search })
      )
    );
  } else {
    return React.createElement("div", null);
  }
};

var Results = function Results(_ref3) {
  var loadMore = _ref3.loadMore;
  var search = _ref3.search;


  if (search.none) {
    return React.createElement(
      "h6",
      { className: "soft" },
      "No results for ",
      search.term,
      "!"
    );
  }
  if (search.items.length > 0) {
    return React.createElement(
      "section",
      { className: "background--light-secondary soft-half" },
      search.items.map(function (item, i) {
        return React.createElement(_Item2["default"], { item: item, key: i });
      }),
      React.createElement(LoadMore, { loadMore: loadMore, search: search })
    );
  }

  return React.createElement("div", null);
};

exports["default"] = Results;
module.exports = exports['default'];