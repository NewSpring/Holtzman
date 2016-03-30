"use strict";

exports.__esModule = true;

var _reactRouter = require("react-router");

var Back = function Back() {

  if (Meteor.isCordova) return React.createElement("div", null);

  return React.createElement(
    _reactRouter.Link,
    { to: "/profile/settings", className: "locked-top locked-left soft-double@lap-and-up soft h7 text-dark-secondary plain" },
    React.createElement("i", { className: "icon-arrow-back soft-half-right display-inline-block", style: { verticalAlign: "middle" } }),
    React.createElement(
      "span",
      { className: "display-inline-block", style: { verticalAlign: "middle", marginBottom: "2px" } },
      "Back"
    )
  );
};

exports["default"] = Back;
module.exports = exports['default'];