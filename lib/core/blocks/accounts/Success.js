"use strict";

exports.__esModule = true;

var _reactRouter = require("react-router");

var Success = function Success(_ref) {
  var person = _ref.person;
  var onExit = _ref.onExit;
  return React.createElement(
    "div",
    { className: "soft soft-double-ends one-whole text-center" },
    React.createElement(
      "h4",
      { className: "text-center push-ends" },
      "Welcome",
      person.nickName ? " " + (person.nickName || person.firstName) : "",
      "!"
    ),
    React.createElement(
      "p",
      { className: "text-left" },
      "Congratulations on setting up your NewSpring account! This account will help us to serve you better in your walk with Jesus. To help us make sure the information we have is accurate and up to date, we would love if you could complete your profile."
    ),
    React.createElement(
      _reactRouter.Link,
      { to: "/profile/settings", className: "one-whole btn push-ends" },
      "Complete Profile Now"
    ),
    React.createElement(
      "button",
      { className: "btn--thin btn--small btn--dark-tertiary one-whole ", onClick: onExit },
      "Complete Later"
    )
  );
};

exports["default"] = Success;
module.exports = exports['default'];