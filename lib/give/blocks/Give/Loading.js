"use strict";

exports.__esModule = true;

var _react = require("react");

var _velocityReact = require("velocity-react");

var _loading = require("../../../core/components/loading");

var Loading = function Loading(context) {
  return React.createElement(
    _velocityReact.VelocityComponent,
    {
      animation: "transition.fadeIn",
      runOnMount: context.shouldAnimate
    },
    React.createElement(
      _loading.WindowLoading,
      { classes: ["background--primary"] },
      React.createElement(
        "div",
        { className: "soft soft-double-ends push-double-top one-whole text-center" },
        React.createElement(
          "div",
          { className: "push-double-top" },
          React.createElement(_loading.Spinner, { styles: { borderColor: "#fff #6BAC43 #fff #fff", borderWidth: "7px" } }),
          React.createElement(
            "h3",
            { className: "text-light-primary push-top" },
            "We're Processing Your Contribution"
          ),
          React.createElement(
            "p",
            { className: "text-light-primary" },
            "Please don't close this window while your contribution is being processed."
          )
        )
      )
    )
  );
};

Loading.contextTypes = {
  shouldAnimate: _react.PropTypes.bool
};

exports["default"] = Loading;
module.exports = exports['default'];