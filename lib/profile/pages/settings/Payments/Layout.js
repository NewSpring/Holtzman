"use strict";

exports.__esModule = true;

var _react = require("react");

var _meta = require("../../../../core/components/meta");

var _meta2 = _interopRequireDefault(_meta);

var _components = require("../../../../give/components");

var _Back = require("../Back");

var _Back2 = _interopRequireDefault(_Back);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Layout = function Layout(_ref) {
  var details = _ref.details;
  var remove = _ref.remove;
  return React.createElement(
    "div",
    { className: "background--light-primary text-center soft-double-top push-double-bottom push-double-top", style: { overflow: "visible" } },
    React.createElement(_meta2["default"], { title: "Saved Payments" }),
    React.createElement(_Back2["default"], null),
    React.createElement(
      "div",
      { className: "one-whole two-thirds@anchored display-inline-block" },
      React.createElement(
        "h3",
        null,
        "Saved Accounts"
      ),
      React.createElement(
        "div",
        { className: "soft-sides soft-double-sides@lap-and-up" },
        details.map(function (account, key) {
          return React.createElement(
            "div",
            { key: key, className: "soft-ends text-left hard-sides outlined--light outlined--bottom constrain-mobile" },
            React.createElement(
              "div",
              { className: "display-inline-block soft-half-ends one-whole" },
              React.createElement(
                "h6",
                { className: "flush-bottom float-left" },
                account.name
              ),
              React.createElement(
                "button",
                { className: "h6 flush-bottom float-right text-alert", id: account.id, onClick: remove },
                "Remove"
              )
            ),
            React.createElement(
              "h5",
              { className: "hard one-whole flush-bottom" },
              account.payment.accountNumber.slice(0, account.payment.accountNumber.length - 5).replace(/./gmi, "*"),
              account.payment.accountNumber.slice(-4),
              React.createElement(
                "span",
                { className: "float-right " },
                React.createElement(_components.AccountType, { width: "30px", height: "20px", type: account.payment.paymentType })
              )
            )
          );
        }),
        React.createElement(
          "p",
          { className: "soft-ends text-left" },
          "To add a saved account, click the option to save account on your next gift!"
        )
      )
    )
  );
};
// import { VelocityComponent } from "velocity-react"

Layout.propTypes = {
  details: _react.PropTypes.array,
  remove: _react.PropTypes.func
};

exports["default"] = Layout;
module.exports = exports['default'];