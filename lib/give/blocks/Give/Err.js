"use strict";

exports.__esModule = true;

var _icons = require("../../../core/components/icons");

var Err = function Err(_ref) {
  var msg = _ref.msg;
  var goToStepOne = _ref.goToStepOne;
  return React.createElement(
    "div",
    { className: "soft soft-double-ends push-double-top one-whole text-center" },
    React.createElement(
      "div",
      { className: "push-double-top" },
      React.createElement(_icons.Error, null),
      React.createElement(
        "h3",
        { className: "text-alert push-ends" },
        "Uh Oh! Looks like there was a problem processing your contribution!"
      ),
      React.createElement(
        "p",
        { className: "text-left" },
        msg
      ),
      React.createElement(
        "div",
        { className: "one-whole text-center soft-ends" },
        React.createElement(
          "button",
          { onClick: goToStepOne, className: "btn--small btn--dark-tertiary one-whole" },
          "Try Again"
        )
      ),
      React.createElement(
        "p",
        { className: "test-dark-tertiary text-left" },
        React.createElement(
          "em",
          null,
          "If you would like a member of our customer support team to follow up with you regarding this error, click ",
          React.createElement(
            "a",
            { target: "_blank", href: "//rock.newspring.cc/workflows/152?Topic=Stewardship" },
            "here"
          )
        )
      )
    )
  );
};

exports["default"] = Err;
module.exports = exports['default'];