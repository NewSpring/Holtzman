"use strict";

exports.__esModule = true;

var Input = function Input(_ref) {
  var searchSubmit = _ref.searchSubmit;
  var cancel = _ref.cancel;
  var showCancel = _ref.showCancel;
  return React.createElement(
    "section",
    { className: "soft-double-ends background--light-primary" },
    function () {
      if (showCancel) {
        return React.createElement(
          "button",
          { onClick: cancel, className: "locked-right push-right push-half-top" },
          React.createElement(
            "small",
            null,
            "Cancel"
          )
        );
      }
    }(),
    React.createElement(
      "form",
      { onSubmit: searchSubmit, className: "hard " + (showCancel ? "push-double-right" : "") },
      React.createElement(
        "div",
        { className: "input hard-bottom " + (showCancel ? "push-right" : "") },
        React.createElement("i", { className: "icon-search locked-left push-half-top" }),
        React.createElement("input", {
          id: "search",
          type: "text",
          className: "h5 text-dark-primary",
          autoComplete: "off",
          style: { paddingLeft: "30px" }
        })
      )
    )
  );
};

exports["default"] = Input;
module.exports = exports['default'];