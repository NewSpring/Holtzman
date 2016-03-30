"use strict";

exports.__esModule = true;

var _components = require("../../../core/components");

var Remind = function Remind(_ref) {
  var onSubmit = _ref.onSubmit;
  var back = _ref.back;


  var reminderFrequency = [{
    label: "Tomorrow",
    value: "tomorrow"
  }, {
    label: "Next Week",
    value: "nextWeek"
  }, {
    label: "In Two Weeks",
    value: "twoWeeks"
  }];

  return React.createElement(
    "div",
    { className: "soft soft-double-ends one-whole text-center" },
    React.createElement(
      "h4",
      { className: "text-center push-ends" },
      "Remind Me Later"
    ),
    React.createElement(
      "p",
      { className: "text-left" },
      "We know life is busy! We would be happy to remind you about transferring your schedules at a later date."
    ),
    React.createElement(
      "p",
      { className: "text-left push-double-bottom" },
      "Please be aware that your existing schedule will continue to charge the account on file until you transfer it for editing in our new system."
    ),
    React.createElement(
      _components.Forms.Form,
      {
        classes: ["text-left", "hard", "push-top"],
        submit: onSubmit,
        id: "remind"
      },
      React.createElement(
        "h3",
        { className: "text-dark-tertiary display-inline-block push-half-bottom push-half-right" },
        "I'd like to be reminded"
      ),
      React.createElement(_components.Forms.Select, {
        items: reminderFrequency,
        name: "frequency",
        id: "remind-frequency",
        hideLabel: true,
        classes: ["soft-bottom", "display-inline-block"],
        inputClasses: "outlined--dotted outlined--light h3 hard-top flush-bottom",
        includeBlank: false,
        defaultValue: "tomorrow"
      }),
      React.createElement(
        "button",
        { className: "one-whole btn push-ends" },
        "Remind Me Later"
      ),
      React.createElement(
        "button",
        {
          className: "btn--thin btn--small btn--dark-tertiary one-whole",
          onClick: back
        },
        "Back to Contributions"
      )
    )
  );
};

exports["default"] = Remind;
module.exports = exports['default'];