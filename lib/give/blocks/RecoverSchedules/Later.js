"use strict";

exports.__esModule = true;

var _moment = require("moment");

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Later = function Later(_ref) {
  var date = _ref.date;
  var onClick = _ref.onClick;
  return React.createElement(
    "div",
    { className: "soft soft-double-ends one-whole text-center" },
    React.createElement(
      "h4",
      { className: "text-center push-ends" },
      "Sounds Great!"
    ),
    React.createElement(
      "p",
      { className: "text-left" },
      "We will remind you about your contributions on ",
      React.createElement(
        "strong",
        null,
        (0, _moment2["default"])(date).format("dddd, MMMM Do")
      ),
      "! If you would like to reset your schedules before then, please contact our Finance Team at 864-965-9990 or ",
      React.createElement(
        "a",
        { target: "_blank", href: "//rock.newspring.cc/workflows/152?Topic=Stewardship" },
        "contact us "
      )
    ),
    React.createElement(
      "button",
      { className: "one-whole btn push-ends", onClick: onClick },
      "Close"
    )
  );
};

exports["default"] = Later;
module.exports = exports['default'];