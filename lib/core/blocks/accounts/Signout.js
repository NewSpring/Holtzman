"use strict";

exports.__esModule = true;

var SignOut = function SignOut(_ref) {
  var signout = _ref.signout;
  return React.createElement(
    "div",
    null,
    React.createElement(
      "div",
      { className: "push-double" },
      React.createElement(
        "h4",
        { className: "text-center" },
        "Sign out of your NewSpring profile"
      )
    ),
    React.createElement(
      "div",
      { className: "one-whole text-center" },
      React.createElement(
        "button",
        { className: "btn", onClick: signout },
        "Sign Out"
      )
    )
  );
};

exports["default"] = SignOut;
module.exports = exports['default'];