"use strict";

exports.__esModule = true;

var _reactRouter = require("react-router");

var Success = function Success(_ref) {
  var email = _ref.email;
  var goBack = _ref.goBack;
  return React.createElement(
    "div",
    { className: "soft soft-double-ends one-whole text-center" },
    React.createElement(
      "h4",
      { className: "text-center push-ends" },
      "Thanks for finishing your account!"
    ),
    React.createElement(
      "p",
      { className: "text-left" },
      "Congratulations on setting up your NewSpring account! This will help us to serve you better in your walk with Jesus. We have sent an email to ",
      React.createElement(
        "span",
        { className: "text-primary" },
        email
      ),
      " with instructions on finishing your account."
    ),
    React.createElement(
      "button",
      { className: "btn--thin btn--small btn--dark-tertiary one-whole ", onClick: goBack },
      "Back"
    )
  );
};

exports["default"] = Success;
module.exports = exports['default'];