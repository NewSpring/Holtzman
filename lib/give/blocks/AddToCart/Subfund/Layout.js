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

var Layout = function Layout(_ref) {
  var classes = _ref.classes;
  var accounts = _ref.accounts;
  var state = _ref.state;
  var preFill = _ref.preFill;
  var showInputs = _ref.showInputs;
  var format = _ref.format;
  var selectVal = _ref.selectVal;
  var inputVal = _ref.inputVal;
  return React.createElement(
    "div",
    null,
    React.createElement(
      "div",
      {
        className: "display-inline-block push-half-bottom h3 push-half-right " + classes },
      "and give to"
    ),
    React.createElement(_components.Forms.Select, {
      items: accounts,
      name: "select-account",
      id: state.id + "_select",
      hideLabel: true,
      classes: ["soft-bottom", "display-inline-block", "" + _styles2["default"].select],
      inputClasses: classes + " outlined--dotted outlined--light h3 hard-top flush-bottom",
      placeholder: "select fund",
      onChange: showInputs,
      includeBlank: true,
      deselect: true,
      selected: selectVal
    }),
    function () {
      if (state.fund) {
        return React.createElement(
          "div",
          { className: "display-block" },
          React.createElement(
            "h3",
            { className: classes + " push-half-bottom push-half-right display-inline-block" },
            "with"
          ),
          React.createElement(_components.Forms.Input, {
            id: state.id,
            name: state.fund || "secondary-account",
            hideLabel: true,
            type: "tel",
            classes: ["soft-bottom", "input--active", "display-inline-block"],
            inputClasses: "outlined--dotted outlined--light h3 hard-top flush-bottom text-dark-primary " + _styles2["default"]["show-placeholder"],
            placeholder: "$0.00",
            format: format,
            defaultValue: preFill(state.id),
            style: { maxWidth: "150px" },
            value: inputVal
          })
        );
      }
    }()
  );
};

exports["default"] = Layout;
module.exports = exports['default'];