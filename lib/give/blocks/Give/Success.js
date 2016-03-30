"use strict";

exports.__esModule = true;

var _icons = require("../../../core/components/icons");

var _moment = require("moment");

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Success = function Success(_ref) {
  var total = _ref.total;
  var email = _ref.email;
  var guest = _ref.guest;
  var onClick = _ref.onClick;
  var schedules = _ref.schedules;


  var schedule = false;
  for (var sched in schedules) {
    schedule = schedules[sched];
    break;
  }

  return React.createElement(
    "div",
    { className: "soft soft-double-ends push-double-top one-whole text-center" },
    React.createElement(
      "div",
      { className: "push-double-top" },
      React.createElement(_icons.Success, null),
      React.createElement(
        "h3",
        { className: "text-primary push-ends" },
        "Success!"
      ),
      function () {
        if (schedule) {
          return React.createElement(
            "p",
            { className: "text-left" },
            "Thank you for your contribution of ",
            total,
            " starting on ",
            (0, _moment2["default"])(schedule.start).format("MMM D, YYYY"),
            " to NewSpring Church."
          );
        }

        return React.createElement(
          "p",
          { className: "text-left" },
          "Thank you for your contribution of ",
          total,
          " to NewSpring Church. We will email a receipt to ",
          email
        );
      }(),
      function () {
        if (guest) {
          return React.createElement(
            "div",
            null,
            React.createElement(
              "p",
              { className: "text-left" },
              "If you would like to view your giving history, make it easier to give, and more, create a NewSpring Account!"
            ),
            React.createElement(
              "button",
              {
                className: "btn one-whole push-bottom", onClick: onClick
              },
              "Create Account"
            )
          );
        }
      }(),
      React.createElement(
        "p",
        { className: "test-dark-tertiary text-left" },
        React.createElement(
          "em",
          null,
          "If you have any questions please call our Finance Team at 864-965-9990 or ",
          React.createElement(
            "a",
            { target: "_blank", href: "//rock.newspring.cc/workflows/152?Topic=Stewardship" },
            "contact us "
          ),
          " and someone will be happy to assist you."
        )
      )
    )
  );
};

exports["default"] = Success;
module.exports = exports['default'];