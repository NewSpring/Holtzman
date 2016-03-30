"use strict";

exports.__esModule = true;
exports["default"] = undefined;

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require("react");

var _components = require("../../../components");

var _components2 = require("../../../../core/components");

var _validate = require("../../../../core/util/validate");

var _validate2 = _interopRequireDefault(_validate);

var _format = require("../../../../core/util/format");

var _format2 = _interopRequireDefault(_format);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Payment = function (_Component) {
  (0, _inherits3["default"])(Payment, _Component);

  function Payment() {
    var _temp, _this, _ret;

    (0, _classCallCheck3["default"])(this, Payment);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3["default"])(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.state = {
      save: true
    }, _this.savePayment = function () {
      _this.setState({ save: !_this.state.save });

      if (_this.state.save) {
        _this.props.save({ payment: { name: null } });
      }
    }, _this.saveName = function (value) {
      if (value.length > 0) {
        _this.props.save({ payment: { name: value } });
      }

      return value.length > 0;
    }, _this.header = function () {
      return React.createElement(
        "h4",
        { className: "text-center" },
        "Payment Details"
      );
    }, _this.icon = function () {
      var payment = _this.props.data.payment;
      var savedAccount = _this.props.savedAccount;


      if (savedAccount && savedAccount.payment && savedAccount.payment.paymentType) {
        return(
          // replace with SVG
          React.createElement(_components.AccountType, { width: "30px", height: "21px", type: savedAccount.payment.paymentType })
        );
      }

      var masked = payment.type === "ach" ? payment.accountNumber : payment.cardNumber;

      if (!masked) {
        return null;
      }

      if (payment.type === "ach") {
        return React.createElement(_components.AccountType, { width: "30px", height: "21px", type: "Bank" });
      }

      if (payment.type === "cc") {

        var getCardType = function getCardType(card) {

          var d = /^6$|^6[05]$|^601[1]?$|^65[0-9][0-9]?$|^6(?:011|5[0-9]{2})[0-9]{0,12}$/gmi;

          var defaultRegex = {
            Visa: /^4[0-9]{0,15}$/gmi,
            MasterCard: /^5$|^5[1-5][0-9]{0,14}$/gmi,
            AmEx: /^3$|^3[47][0-9]{0,13}$/gmi,
            Discover: d
          };

          for (var regex in defaultRegex) {
            if (defaultRegex[regex].test(card.replace(/-/gmi, ""))) {
              return regex;
            }
          }

          return null;
        };

        return(
          // replace with SVG
          React.createElement(_components.AccountType, { width: "30px", height: "21px", type: getCardType(masked) })
        );
      }
    }, _this.toggles = ["Credit Card", "Bank Account"], _this.bankFields = function () {
      var payment = _this.props.data.payment;

      return React.createElement(
        "div",
        null,
        React.createElement(_components2.Forms.Input, {
          id: "routingNumber",
          name: "billing-routing-number",
          label: "Routing Number",
          type: "tel",
          errorText: "Please enter your routing number",
          defaultValue: payment.routingNumber,
          onChange: _this.saveData,
          validation: _this.validate,
          autofocus: true,
          ref: "routingNumber"
        }),
        React.createElement(_components2.Forms.Input, {
          id: "accountNumber",
          name: "billing-account-number",
          label: "Account Number",
          type: "tel",
          errorText: "Please enter your account number",
          defaultValue: payment.accountNumber,
          onChange: _this.saveData,
          validation: _this.validate,
          ref: "accountNumber"

        }),
        React.createElement(
          "div",
          { className: "grid" },
          React.createElement(
            "div",
            { className: "grid__item one-whole" },
            React.createElement(_components2.Forms.Select, {
              name: "billing-account-type",
              ref: "accountType",
              id: "accountType",
              label: "Account Type",
              onChange: _this.saveData,
              validation: _this.validate,
              defaultValue: payment.accountType,
              errorText: "Please choose your account type",
              includeBlank: true,
              items: [{ value: "checking", label: "Checking" }, { value: "savings", label: "Savings" }]
            })
          )
        )
      );
    }, _this.validate = function (value, target) {
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
        cardNumber: _validate2["default"].isCreditCard,
        expiration: notEmpty,
        ccv: _validate2["default"].isCCV
      };

      isValid = validationMap[id](value);

      // special case for intial repaint
      if ((id === "cardNumber" || id === "routingNumber") && !value) {
        return true;
      }

      return isValid;
    }, _this.saveData = function (value, target) {
      var id = target.id;


      var isValid = _this.validate(value, target);

      if (isValid) {
        var _payment;

        _this.props.save({ payment: (_payment = {}, _payment[id] = value, _payment) });
      }
    }, _this.formatExp = function (str, target, event) {

      var save = function save(adjusted) {
        _this.saveData(adjusted, target);
        return adjusted;
      };

      var current = _this.props.data.payment.expiration;
      current || (current = "");
      str = "" + str;

      if (str.length > 5) {
        return save(str.slice(0, 5));
      }

      var copy = str;
      var lastNumber = copy.slice(-1);
      var currentLastNumber = current.slice(-1);

      if (lastNumber === "/" && str.length === 1) {
        return save("0" + str + "/");
      }

      if (lastNumber === "/" && str.length === 2 && currentLastNumber != "/") {
        return save(str + "/");
      }

      if (str.length === 2 && lastNumber != "/" && currentLastNumber != "/") {
        return save(str + "/");
      }

      if (str.length === 4 && lastNumber === "/") {
        return save(str.slice(0, 3));
      }

      return save(str);
    }, _this.cardFields = function () {
      var payment = _this.props.data.payment;

      return React.createElement(
        "div",
        null,
        React.createElement(
          _components2.Forms.Input,
          {
            name: "billing-cc-number",
            id: "cardNumber",
            label: "Card Number",
            type: "tel",
            errorText: "Please enter your card number",
            defaultValue: payment.cardNumber,
            format: _format2["default"].creditCard,
            onChange: _this.saveData,
            validation: _this.validate,
            ref: "cardNumber"
          },
          React.createElement(
            "div",
            { className: "locked locked-right soft-double-right locked-top", style: { top: "-3px" } },
            _this.icon()
          )
        ),
        React.createElement(
          "div",
          { className: "grid" },
          React.createElement(
            "div",
            { className: "grid__item one-half" },
            React.createElement(_components2.Forms.Input, {
              id: "expiration",
              name: "billing-cc-exp",
              label: "Exp (MM/YY)",
              type: "tel",
              errorText: "Please enter a valid expiration number",
              defaultValue: payment.expiration,
              format: _this.formatExp,
              onChange: _this.saveData,
              validation: function validation(value) {
                return value.length > 0;
              },
              ref: "expiration",
              "data-expiry-input": true
            })
          ),
          React.createElement(
            "div",
            { className: "grid__item one-half" },
            React.createElement(_components2.Forms.Input, {
              id: "ccv",
              name: "billing-cvv",
              label: "CCV",
              type: "tel",
              errorText: "Please enter a valid ccv number",
              defaultValue: payment.ccv,
              onChange: _this.saveData,
              validation: _this.validate,
              ref: "ccv"
            })
          )
        )
      );
    }, _this.toggle = function () {
      var type = "ach";
      if (_this.props.data.payment.type === type) {
        type = "cc";
      }

      _this.props.save({ payment: { type: type } });
    }, _temp), (0, _possibleConstructorReturn3["default"])(_this, _ret);
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
      React.createElement(_components2.Controls.Toggle, {
        items: this.props.toggles || this.toggles,
        state: payment.type === "ach",
        toggle: this.toggle
      }),
      React.createElement(
        "div",
        { className: "soft" },
        function () {
          if (payment.type === "ach") {
            return _this2.bankFields();
          } else {
            return _this2.cardFields();
          }
        }(),
        function () {
          if (_this2.props.savedAccount.id === null && _this2.props.transactionType != "guest" && Object.keys(_this2.props.schedules).length === 0) {
            return React.createElement(
              _components2.Forms.Checkbox,
              {
                name: "savePayment",
                defaultValue: _this2.state.save,
                clicked: _this2.savePayment
              },
              "Save this payment for future contributions"
            );
          }
        }(),
        function () {
          if (_this2.state.save && _this2.props.savedAccount.id === null && _this2.props.transactionType != "guest" && Object.keys(_this2.props.schedules).length === 0) {
            return React.createElement(_components2.Forms.Input, {
              name: "accountName",
              label: "Saved Account Name",
              classes: ["soft-bottom", "flush-bttom"],
              errorText: "Please enter a name for the account",
              validation: _this2.saveName,
              defaultValue: payment.type === "ach" ? "Bank Account" : "Credit Card",
              ref: "accountName"
            });
          }
        }()
      ),
      React.createElement(
        "div",
        null,
        React.createElement(
          "a",
          { href: "#", tabIndex: -1, onClick: this.props.back, className: "btn--small btn--dark-tertiary display-inline-block" },
          "Back"
        ),
        function () {
          var billing = _this2.props.data.billing;

          var btnClasses = ["push-left"];

          var ach = payment.type === "ach" && payment.accountNumber && payment.routingNumber;
          var cc = payment.type === "cc" && payment.cardNumber && payment.expiration && payment.ccv;

          var submit = _this2.props.next;
          var disabled = false;
          if (ach || cc) {
            btnClasses.push("btn");
            submit = _this2.props.next;
          } else {
            btnClasses.push("btn--disabled");
            disabled = true;
            submit = function submit(e) {
              return e.preventDefault();
            };
          }

          return React.createElement(
            "button",
            { className: btnClasses.join(" "), disabled: disabled, type: "submit", onClick: submit },
            "Next"
          );
        }()
      )
    );
  };

  return Payment;
}(_react.Component);

exports["default"] = Payment;
module.exports = exports['default'];