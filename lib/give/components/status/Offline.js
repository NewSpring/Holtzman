"use strict";

exports.__esModule = true;

var _react = require("react");

var Offline = function Offline() {
  return React.createElement(
    "div",
    null,
    React.createElement(
      "h3",
      { className: "text-dark-tertiary" },
      "Unfortunately our giving service is offline."
    ),
    React.createElement(
      "p",
      null,
      "We are working to resolve this as fast as possible. We are sorry for any inconvience this may have caused."
    ),
    React.createElement(
      "p",
      null,
      React.createElement(
        "em",
        null,
        "We appreciate your patience. If you have any questions please contact us at ",
        React.createElement(
          "a",
          { href: "mailto:finance@newspring.cc" },
          "finance@newspring.cc"
        )
      )
    )
  );
};

exports["default"] = Offline;
module.exports = exports['default'];