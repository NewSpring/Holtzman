"use strict";

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require("react");

var _reactDom = require("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRedux = require("react-redux");

var _coreClientComponents = require("../../../../../core/client/components");

var _coreLib = require("../../../../../core/lib");

var Payment = (function (_Component) {
  _inherits(Payment, _Component);

  function Payment() {
    var _this = this;

    _classCallCheck(this, Payment);

    _Component.apply(this, arguments);

    this.header = function () {
      return React.createElement(
        "h4",
        { className: "text-center" },
        "Payment Details"
      );
    };

    this.toggles = [{ label: "Bank Account" }, { label: "Credit Card" }];

    this.bankFields = function () {
      var payment = _this.props.data.payment;

      return React.createElement(
        "div",
        null,
        React.createElement(_coreClientComponents.Forms.Input, {
          id: "accountNumber",
          name: "billing-account-number",
          label: "Account Number",
          type: "tel",
          errorText: "Please enter your account number",
          defaultValue: payment.accountNumber,
          validation: _this.saveData,
          ref: "accountNumber"
        }),
        React.createElement(_coreClientComponents.Forms.Input, {
          id: "routingNumber",
          name: "billing-routing-number",
          label: "Routing Number",
          type: "tel",
          errorText: "Please enter your routing number",
          defaultValue: payment.accountNumber,
          validation: _this.saveData,
          ref: "routingNumber"
        }),
        React.createElement(
          "div",
          { className: "grid" },
          React.createElement(
            "div",
            { className: "grid__item one-half" },
            React.createElement(_coreClientComponents.Forms.Input, {
              name: "billing-account-name",
              ref: "accountName",
              id: "accountName",
              label: "Bank Name",
              validation: _this.saveData,
              defaultValue: payment.accountName,
              errorText: "Please enter your bank number"
            })
          ),
          React.createElement(
            "div",
            { className: "grid__item one-half" },
            React.createElement(_coreClientComponents.Forms.Select, {
              name: "billing-account-type",
              ref: "accountType",
              id: "accountType",
              label: "Account Type",
              validation: _this.saveData,
              defaultValue: payment.accountType,
              errorText: "Please choose your account type",
              includeBlank: true,
              items: [{ value: "checking", label: "Checking" }, { value: "savings", label: "Savings" }]
            })
          )
        )
      );
    };

    this.saveData = function (value, target) {
      var id = target.id;

      var isValid = false;
      var notEmpty = function notEmpty(value) {
        return value.length > 0;
      };
      var validationMap = {
        accountNumber: notEmpty,
        routingNumber: notEmpty,
        accountType: notEmpty,
        accountName: notEmpty,
        cardNumber: _coreLib.Validate.isCreditCard,
        expiration: _coreLib.Validate.isExpiry,
        ccv: _coreLib.Validate.isCCV
      };

      isValid = validationMap[id](value);

      if (isValid) {
        var _payment;

        _this.props.save({ payment: (_payment = {}, _payment[id] = value, _payment) });
      } else {
        _this.props.clear("payment", id);
      }

      return isValid;
    };

    this.cardFields = function () {
      var payment = _this.props.data.payment;

      return React.createElement(
        "div",
        null,
        React.createElement(_coreClientComponents.Forms.Input, {
          name: "billing-cc-number",
          id: "cardNumber",
          label: "Card Number",
          type: "tel",
          errorText: "Please enter your card number",
          defaultValue: payment.cardNumber,
          format: _coreLib.Format.creditCard,
          validation: _this.saveData,
          ref: "cardNumber"
        }),
        React.createElement(
          "div",
          { className: "grid" },
          React.createElement(
            "div",
            { className: "grid__item one-half" },
            React.createElement(_coreClientComponents.Forms.Input, {
              id: "expiration",
              name: "billing-cc-exp",
              label: "Expiration Number",
              type: "tel",
              errorText: "Please enter a valid expiration number",
              defaultValue: payment.expiration,
              validation: _this.saveData,
              ref: "expiration"
            })
          ),
          React.createElement(
            "div",
            { className: "grid__item one-half" },
            React.createElement(_coreClientComponents.Forms.Input, {
              id: "ccv",
              name: "billing-cvv",
              label: "CCV",
              type: "number",
              errorText: "Please enter a valid ccv number",
              defaultValue: payment.ccv,
              validation: _this.saveData,
              ref: "ccv"
            })
          )
        )
      );
    };

    this.toggle = function () {
      var type = "ach";
      if (_this.props.data.payment.type === type) {
        type = "cc";
      }

      _this.props.save({ payment: { type: type } });
    };
  }

  Payment.prototype.render = function render() {
    var _this2 = this;

    var payment = this.props.data.payment;

    return React.createElement(
      "div",
      null,
      React.createElement(
        "div",
        { className: "push-double@lap-and-up push" },
        this.props.header || this.header()
      ),
      this.props.children,
      React.createElement(_coreClientComponents.Controls.Toggle, {
        items: this.props.toggles || this.toggles,
        state: payment.type === "ach",
        toggle: this.toggle
      }),
      React.createElement(
        "div",
        { className: "soft" },
        (function () {
          if (payment.type === "ach") {
            return _this2.bankFields();
          } else {
            return _this2.cardFields();
          }
        })()
      ),
      React.createElement(
        "div",
        null,
        React.createElement(
          "a",
          { href: "#", tabIndex: -1, onClick: this.props.back, className: "btn--small btn--dark-tertiary display-inline-block" },
          "Back"
        ),
        (function () {
          var billing = _this2.props.data.billing;

          var btnClasses = ["push-left"];

          var ach = payment.type === "ach" && payment.accountNumber && payment.routingNumber;
          var cc = payment.type === "cc" && payment.cardNumber && payment.expiration && payment.ccv;

          var submit = _this2.props.next;
          if (ach || cc) {
            btnClasses.push("btn");
            submit = _this2.props.next;
          } else {
            btnClasses.push("btn--disabled");
            submit = function (e) {
              return e.preventDefault();
            };
          }

          return React.createElement(
            "button",
            { className: btnClasses.join(" "), type: "submit", onClick: submit },
            "Enter"
          );
        })()
      )
    );
  };

  return Payment;
})(_react.Component);

exports["default"] = Payment;
module.exports = exports["default"];