"use strict";

exports.__esModule = true;

var _react = require("react");

var _velocityReact = require("velocity-react");

var _loading = require("../../components/loading");

var Loading = function Loading(_ref, context) {
  var account = _ref.account;
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
        { className: "locked-top locked-bottom one-whole floating" },
        React.createElement(
          "div",
          { className: "floating__item" },
          React.createElement(_loading.Spinner, null),
          function () {
            if (account) {
              return React.createElement(
                "h4",
                { className: "text-light-primary" },
                "Signing you in..."
              );
            }

            return React.createElement(
              "h4",
              { className: "text-light-primary" },
              "Creating your account"
            );
          }()
        )
      )
    )
  );
};

Loading.propTypes = {
  account: _react.PropTypes.bool
};

Loading.defaultProps = {
  account: false
};

Loading.contextTypes = {
  shouldAnimate: _react.PropTypes.bool
};

exports["default"] = Loading;
module.exports = exports['default'];