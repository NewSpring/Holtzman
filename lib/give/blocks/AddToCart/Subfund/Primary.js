"use strict";

exports.__esModule = true;

var _react = require("react");

var _components = require("../../../../core/components");

var _styles = {
  "show-placeholder": "styles__show-placeholder___gdvyn",
  "select": "styles__select___3YAtu"
};

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Primary = function Primary(_ref) {
  var classes = _ref.classes;
  var accounts = _ref.accounts;
  var state = _ref.state;
  var preFill = _ref.preFill;
  var saveFund = _ref.saveFund;
  var format = _ref.format;
  var donate = _ref.donate;
  var selectVal = _ref.selectVal;
  return React.createElement(
    "div",
    null,
    React.createElement(
      "h3",
      { className: "text-dark-tertiary display-inline-block push-half-bottom push-half-right" },
      "I'd like to give"
    ),
    React.createElement(_components.Forms.Input, {
      id: state.id || "secondary-account",
      name: state.fund || "secondary-account",
      hideLabel: true,
      type: "tel",
      classes: ["soft-bottom", "input--active", "display-inline-block"],
      inputClasses: "outlined--dotted outlined--light h3 hard-top flush-bottom text-dark-primary " + _styles2["default"]["show-placeholder"],
      placeholder: "$0.00",
      format: format,
      defaultValue: preFill(state.id),
      style: { maxWidth: "150px" }
    }),
    React.createElement(
      "h3",
      { className: "text-dark-tertiary display-inline-block push-half-bottom push-half-right" },
      "to"
    ),
    function () {
      // if (accounts.length > 1) {
      return React.createElement(_components.Forms.Select, {
        items: accounts,
        name: "select-account",
        id: state.id + "_select",
        hideLabel: true,
        classes: ["soft-bottom", "display-inline-block", _styles2["default"].select],
        inputClasses: classes + " outlined--dotted outlined--light h3 hard-top flush-bottom",
        placeholder: "select fund",
        onChange: saveFund,
        selected: selectVal
      });
      // }

      return React.createElement(
        "h3",
        { className: "text-dark-primary display-inline-block push-half-bottom push-half-right" },
        accounts[0].label
      );
    }()
  );
};

exports["default"] = Primary;
module.exports = exports['default'];