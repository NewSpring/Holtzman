"use strict";

exports.__esModule = true;

var _react = require("react");

var _components = require("../../../core/components");

var _ActionButtons = require("../ActionButtons");

var _ActionButtons2 = _interopRequireDefault(_ActionButtons);

var _Subfund = require("./Subfund");

var _Subfund2 = _interopRequireDefault(_Subfund);

var _styles = {
  "show-placeholder": "styles__show-placeholder___gdvyn",
  "select": "styles__select___3YAtu"
};

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Layout = function Layout(_ref) {
  var accounts = _ref.accounts;
  var primary = _ref.primary;
  var save = _ref.save;
  var format = _ref.format;
  var preFill = _ref.preFill;
  var total = _ref.total;
  var transactions = _ref.transactions;
  var otherAccounts = _ref.otherAccounts;
  var monentize = _ref.monentize;
  return React.createElement(
    "div",
    { className: "push-top@handheld soft-half-top@lap-and-up" },
    React.createElement(
      _components.Forms.Form,
      {
        classes: ["text-left", "hard"],
        submit: function submit(e) {
          e.preventDefault();
        },
        id: "add-to-cart"
      },
      React.createElement(
        "div",
        { className: "one-whole text-center" },
        React.createElement(_components.Forms.Input, {
          id: primary.id,
          name: primary.name,
          type: "tel",
          hideLabel: true,
          classes: ["soft-bottom", "input--active", "text-center", "one-whole", "one-half@lap-and-up", "display-inline-block"],
          inputClasses: "outlined--dotted outlined--light h1 hard-top flush-bottom text-dark-primary " + _styles2["default"]["show-placeholder"] + " text-center",
          placeholder: "$0.00",
          validate: save,
          format: format,
          defaultValue: preFill(primary.id),
          style: { fontSize: "72px" }
        }),
        React.createElement("div", { className: "clearfix" }),
        React.createElement(_components.Forms.Select, {
          items: accounts,
          name: "select-account",
          hideLabel: true,
          classes: ["soft-ends", "display-inline-block", "four-fifths", "one-half@lap-and-up"],
          inputClasses: "outlined--dotted outlined--light h3 hard-top flush-bottom text-center",
          placeholder: "select fund",
          includeBlank: true
        })
      ),
      React.createElement(
        "div",
        { className: "push-top text-center" },
        React.createElement(_ActionButtons2["default"], {
          disabled: total <= 0
        })
      )
    )
  );
};

exports["default"] = Layout;
module.exports = exports['default'];