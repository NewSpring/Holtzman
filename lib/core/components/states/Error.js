"use strict";

exports.__esModule = true;

var _react = require("react");

var _velocityReact = require("velocity-react");

var _loading = require("../loading");

var Err = function Err(_ref, context) {
  var msg = _ref.msg;
  var error = _ref.error;
  var style = _ref.style;


  if (typeof error != "string") {
    if (error.message) {
      error = error.message;
    } else if (error.error && typeof error.error === "string") {
      error = error.error;
    } else {
      error = "An unexpected error occured";
    }
  }

  return React.createElement(
    _velocityReact.VelocityComponent,
    {
      animation: "transition.fadeIn",
      runOnMount: context.shouldAnimate
    },
    React.createElement(
      _loading.WindowLoading,
      { classes: ["background--alert"], styles: style },
      React.createElement(
        "div",
        { className: "locked-top locked-bottom one-whole floating" },
        React.createElement(
          "div",
          { className: "floating__item" },
          React.createElement(
            "h4",
            { className: "text-light-primary" },
            msg
          ),
          React.createElement(
            "p",
            { className: "text-light-primary hard" },
            error
          )
        )
      )
    )
  );
};

Err.contextTypes = {
  shouldAnimate: _react.PropTypes.bool
};

exports["default"] = Err;
module.exports = exports['default'];