"use strict";

exports.__esModule = true;

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require("react");

var _components = require("../../../components");

var _coreClientComponents = require("../../../../../core/client/components");

var Confirm = (function (_Component) {
  _inherits(Confirm, _Component);

  function Confirm() {
    var _this = this;

    _classCallCheck(this, Confirm);

    _Component.apply(this, arguments);

    this.state = {
      save: false
    };

    this.header = function () {
      return React.createElement(
        "h4",
        { className: "text-center" },
        "Review And Complete Your Gift"
      );
    };

    this.buttonText = function () {
      var payment = _this.props.data.payment;

      var text = "Give Now";
      if (payment.accountNumber || payment.cardNumber) {

        var masked = payment.type === "ach" ? payment.accountNumber : payment.cardNumber;
        text += " using " + masked.slice(-4);
      }

      return text;
    };

    this.icon = function () {
      var payment = _this.props.data.payment;

      var masked = payment.type === "ach" ? payment.accountNumber : payment.cardNumber;

      if (payment.type === "ach") {
        return React.createElement(_components.AccountType, { width: "30px", height: "20px", type: "Bank" });
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
          React.createElement(_components.AccountType, { width: "30px", height: "20px", type: getCardType(masked) })
        );
      }
    };

    this.monentize = function (value, fixed) {

      if (typeof value === "number") {
        value = "" + value;
      }

      if (!value.length) {
        return "$0.00";
      }

      value = value.replace(/[^\d.-]/g, "");

      var decimals = value.split(".")[1];
      if (decimals && decimals.length >= 2 || fixed) {
        value = Number(value).toFixed(2);
        value = String(value);
      }

      value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return "$" + value;
    };

    this.listItem = function (transaction, key) {
      return React.createElement(
        "div",
        { key: key, className: "soft-ends hard-sides outlined--light outlined--bottom" },
        React.createElement(
          "div",
          { className: "grid", style: { verticalAlign: "middle" } },
          React.createElement(
            "div",
            { className: "grid__item five-eighths", style: { verticalAlign: "middle" } },
            React.createElement(
              "h5",
              { className: "text-dark-tertiary flush text-left" },
              transaction.label
            )
          ),
          React.createElement(
            "div",
            { className: "grid__item three-eighths text-right", style: { verticalAlign: "middle" } },
            React.createElement(
              "h3",
              { className: "text-dark-secondary flush" },
              _this.monentize(transaction.value)
            )
          )
        )
      );
    };

    this.savePayment = function () {
      _this.setState({ save: !_this.state.save });

      if (_this.state.save) {
        _this.props.save({ payment: { name: null } });
      }
    };

    this.saveName = function (value) {
      if (value.length > 0) {
        _this.props.save({ payment: { name: value } });
      }

      return value.length > 0;
    };
  }

  Confirm.prototype.render = function render() {
    var _this2 = this;

    var transactions = [];

    for (var transaction in this.props.transactions) {
      transactions.push(this.props.transactions[transaction]);
    }

    return React.createElement(
      "div",
      null,
      React.createElement(
        "div",
        { className: "push-double@lap-and-up push" },
        this.props.header || this.header()
      ),
      React.createElement(
        "div",
        { className: "soft" },
        transactions.map(function (transaction, key) {
          return _this2.listItem(transaction, key);
        }),
        React.createElement(
          "div",
          { className: "soft-ends hard-sides" },
          React.createElement(
            "div",
            { className: "grid", style: { verticalAlign: "middle" } },
            React.createElement(
              "div",
              { className: "grid__item five-eighths", style: { verticalAlign: "middle" } },
              React.createElement(
                "h5",
                { className: "text-dark-tertiary flush text-left" },
                "Total"
              )
            ),
            React.createElement(
              "div",
              { className: "grid__item three-eighths text-right", style: { verticalAlign: "middle" } },
              React.createElement(
                "h3",
                { className: "text-primary flush" },
                this.monentize(this.props.total)
              )
            )
          )
        ),
        (function () {
          if (!_this2.props.savedAccount) {
            return React.createElement(
              _coreClientComponents.Forms.Checkbox,
              {
                name: "savePayment",
                defaultValue: false,
                clicked: _this2.savePayment
              },
              "Save this payment for future gifts"
            );
          }
        })(),
        (function () {
          if (_this2.state.save) {
            return React.createElement(_coreClientComponents.Forms.Input, {
              name: "accountName",
              label: "Saved Account Name",
              errorText: "Please enter a name for the account",
              validation: _this2.saveName,
              ref: "accountName"
            });
          }
        })(),
        React.createElement(
          "button",
          { className: "btn one-whole push-top", type: "submit" },
          this.buttonText(),
          " ",
          this.icon()
        )
      )
    );
  };

  _createClass(Confirm, null, [{
    key: "propTypes",
    value: {
      data: _react.PropTypes.object.isRequired,
      save: _react.PropTypes.func.isRequired,
      errors: _react.PropTypes.object.isRequired,
      clear: _react.PropTypes.func.isRequired,
      next: _react.PropTypes.func.isRequired
    },
    enumerable: true
  }]);

  return Confirm;
})(_react.Component);

exports["default"] = Confirm;
module.exports = exports["default"];