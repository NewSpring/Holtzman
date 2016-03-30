"use strict";

exports.__esModule = true;

var _components = require("../../../core/components");

var _reactRouter = require("react-router");

var RecoverableSchedule = function RecoverableSchedule(_ref) {
  var id = _ref.id;
  var account = _ref.account;
  var amount = _ref.amount;
  var frequency = _ref.frequency;
  var removeOnClick = _ref.removeOnClick;
  return React.createElement(
    "div",
    null,
    React.createElement(
      "div",
      { className: "display-inline-block soft-half-ends one-whole" },
      React.createElement(
        "h5",
        { className: "flush-bottom float-left" },
        account
      )
    ),
    React.createElement(
      "div",
      { className: "grid push-top soft-bottom" },
      React.createElement(
        "div",
        { className: "grid__item one-half" },
        React.createElement(_components.Forms.Input, {
          label: "Amount",
          defaultValue: "$" + amount,
          disabled: true,
          classes: ["soft-half-bottom"]
        })
      ),
      React.createElement(
        "div",
        { className: "grid__item one-half" },
        React.createElement(_components.Forms.Input, {
          label: "Frequency",
          defaultValue: frequency,
          disabled: true,
          classes: ["soft-half-bottom"]
        })
      )
    )
  );
};

var Layout = function Layout(_ref2) {
  var schedules = _ref2.schedules;
  var reminderDate = _ref2.reminderDate;
  var onClick = _ref2.onClick;
  var hide = _ref2.hide;
  return React.createElement(
    "div",
    { className: "soft soft-double-ends one-whole text-center" },
    React.createElement(
      "h4",
      { className: "text-center push-ends" },
      "Transfer Your Schedule"
    ),
    React.createElement(
      "p",
      { className: "push-bottom text-left" },
      "Our records show that you have active giving schedules in our previous system. To access your schedule within our new system, simply review your schedule and re-enter your payment details. If you're not ready to do this, your schedule will continue in our previous system until you transfer it."
    ),
    schedules.map(function (schedule) {
      return React.createElement(RecoverableSchedule, {
        amount: schedule.details[0].amount,
        frequency: schedule.schedule.value,
        account: schedule.details[0].account.name,
        key: Number(schedule.id),
        id: Number(schedule.id)
      });
    }),
    React.createElement(
      _reactRouter.Link,
      { className: "btn one-whole push-ends", to: "/give/schedules/transfer", onClick: hide },
      "Confirm Schedules"
    ),
    React.createElement(
      "button",
      { className: "btn--thin btn--small btn--dark-tertiary one-whole", onClick: onClick },
      "Remind Me Later"
    ),
    React.createElement(
      "p",
      { className: "push-top text-left" },
      React.createElement(
        "em",
        null,
        React.createElement(
          "small",
          null,
          "You can cancel your schedule at any time from the Scheduled Giving page. If you have any questions please call our Finance Team at 864-965-9990 or ",
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

exports["default"] = Layout;
module.exports = exports['default'];