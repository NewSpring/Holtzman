"use strict";

exports.__esModule = true;

var _react = require("react");

var _velocityReact = require("velocity-react");

var _loading = require("../loading");

var Loading = function Loading(_ref, context) {
  var msg = _ref.msg;
  var style = _ref.style;
  return React.createElement(
    _velocityReact.VelocityComponent,
    {
      animation: "transition.fadeIn",
      runOnMount: context.shouldAnimate
    },
    React.createElement(
      _loading.WindowLoading,
      { styles: style, classes: ["background--primary"] },
      React.createElement(
        "div",
        { className: "locked-top locked-bottom one-whole floating" },
        React.createElement(
          "div",
          { className: "floating__item" },
          React.createElement(_loading.Spinner, { styles: { borderColor: "#fff #6BAC43 #fff #fff", borderWidth: "7px" } }),
          React.createElement(
            "h4",
            { className: "text-light-primary" },
            msg
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