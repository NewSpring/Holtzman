"use strict";

exports.__esModule = true;
exports["default"] = undefined;

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _class, _temp2;

var _react = require("react");

var _components = require("../../../components");

var _moment = require("moment");

var _moment2 = _interopRequireDefault(_moment);

var _reactRedux = require("react-redux");

var _components2 = require("../../../../core/components");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Confirm = (_temp2 = _class = function (_Component) {
  (0, _inherits3["default"])(Confirm, _Component);

  function Confirm() {
    var _temp, _this, _ret;

    (0, _classCallCheck3["default"])(this, Confirm);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3["default"])(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.state = {
      changePayments: false
    }, _this.header = function () {
      var personal = _this.props.data.personal;

      return React.createElement(
        "h4",
        { className: "text-center" },
        "Hi ",
        personal.firstName,
        "! Here are your contribution details."
      );
    }, _this.scheduleHeader = function () {
      if (_this.props.scheduleToRecover) {
        return React.createElement(
          "h4",
          { className: "text-center" },
          "Transfer Your Schedule"
        );
      }
      return React.createElement(
        "h4",
        { className: "text-center" },
        "Review Your Schedule"
      );
    }, _this.changePaymentHeader = function () {
      return React.createElement(
        "h4",
        { className: "text-center flush-bottom" },
        "Change Payment Account"
      );
    }, _this.buttonText = function () {
      var payment = _this.props.data.payment;


      if (!payment.accountNumber && !payment.cardNumber) {
        payment = (0, _extends3["default"])({}, _this.props.savedAccount.payment);
        payment.type = "ach";
      }

      var text = "Give Now";

      if (Object.keys(_this.props.schedules).length) {
        text = "Schedule Now";
      }

      if (_this.props.scheduleToRecover) {
        text = "Transfer Now";
      }

      if (payment.accountNumber || payment.cardNumber) {

        var masked = payment.type === "ach" ? payment.accountNumber : payment.cardNumber;
        text += " using " + masked.slice(-4);
      }

      return text;
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
    }, _this.monentize = function (value, fixed) {

      if (typeof value === "number") {
        value = "" + value;
      }

      if (!value.length) {
        return "$0.00";
      }

      value = value.replace(/[^\d.-]/g, "");

      var decimals = value.split(".")[1];
      if (decimals && decimals.length >= 1 || fixed) {
        value = Number(value).toFixed(2);
        value = String(value);
      }

      value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return "$" + value;
    }, _this.listItem = function (transaction, key) {
      return React.createElement(
        "div",
        { key: key, className: "soft-half-ends hard-sides" },
        React.createElement(
          "div",
          { className: "grid", style: { verticalAlign: "middle" } },
          React.createElement(
            "div",
            { className: "grid__item two-thirds", style: { verticalAlign: "middle" } },
            React.createElement(
              "h5",
              { className: "text-dark-secondary flush text-left" },
              transaction.label
            )
          ),
          React.createElement(
            "div",
            { className: "grid__item one-third text-right", style: { verticalAlign: "middle" } },
            React.createElement(
              "h5",
              { className: "text-dark-secondary flush" },
              _this.monentize(transaction.value)
            )
          )
        )
      );
    }, _this.scheduleItem = function (schedule, key) {

      return React.createElement(
        "div",
        { className: "display-inline-block one-whole", key: key },
        React.createElement(
          "p",
          null,
          "Starting on ",
          (0, _moment2["default"])(schedule.start).format("MMM D, YYYY"),
          ", I will give ",
          React.createElement(
            "span",
            { clasName: "text-primary" },
            _this.monentize(_this.props.total)
          ),
          " to ",
          schedule.label,
          ". This will occur ",
          schedule.frequency,
          "."
        )
      );
    }, _this.renderScheduleConfirm = function () {
      var schedules = [];

      for (var schedule in _this.props.schedules) {
        schedules.push(_this.props.schedules[schedule]);
      }

      return React.createElement(
        "div",
        null,
        React.createElement(
          "div",
          { className: "push-double@lap-and-up push" },
          _this.props.header || _this.scheduleHeader()
        ),
        React.createElement(
          "div",
          { className: "soft" },
          schedules.map(function (schedule, key) {
            return _this.scheduleItem(schedule, key);
          }),
          React.createElement(
            "button",
            { className: "btn one-whole push-top soft-sides", type: "submit" },
            _this.buttonText(),
            " ",
            _this.icon()
          ),
          _this.renderPaymentOptions()
        )
      );
    }, _this.changeAccounts = function (e) {
      e.preventDefault();

      _this.setState({
        changePayments: !_this.state.changePayments
      });
    }, _this.choose = function (e) {
      e.preventDefault();

      var id = e.currentTarget.id;

      var act = {};
      for (var _iterator = _this.props.savedAccounts, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
        var _ref;

        if (_isArray) {
          if (_i >= _iterator.length) break;
          _ref = _iterator[_i++];
        } else {
          _i = _iterator.next();
          if (_i.done) break;
          _ref = _i.value;
        }

        var account = _ref;

        if (Number(account.id) === Number(id)) {
          act = account;
          break;
        }
      }

      _this.props.changeSavedAccount(act);
    }, _this.renderPaymentOptions = function () {
      return React.createElement(
        "div",
        null,
        function () {
          if (_this.props.savedAccount.id === null) {
            return React.createElement(
              "div",
              { className: "display-block soft-top text-left" },
              React.createElement(
                "h6",
                {
                  className: "outlined--light outlined--bottom display-inline-block text-dark-tertiary",
                  style: { cursor: "pointer" },
                  onClick: _this.props.back
                },
                "Edit Contribution Details"
              )
            );
          } else {
            return React.createElement(
              "div",
              { className: "display-block soft-top text-left" },
              React.createElement(
                "h6",
                {
                  className: "outlined--light outlined--bottom display-inline-block text-dark-tertiary",
                  style: { cursor: "pointer" },
                  onClick: _this.changeAccounts
                },
                "Change Payment Accounts"
              ),
              React.createElement("br", null),
              React.createElement(
                "h6",
                {
                  className: "outlined--light outlined--bottom display-inline-block text-dark-tertiary",
                  style: { cursor: "pointer" },
                  onClick: _this.props.goToStepOne
                },
                "Enter New Payment"
              )
            );
          }
        }()
      );
    }, _this.renderPaymentOptionsSelect = function () {
      return React.createElement(
        "div",
        null,
        React.createElement(
          "div",
          { className: "soft-sides flush-bottom push-double-top@lap-and-up" },
          _this.changePaymentHeader()
        ),
        React.createElement(
          "div",
          { className: "soft" },
          _this.props.savedAccounts.map(function (account, key) {
            return React.createElement(
              "div",
              { key: key, style: { position: "relative", cursor: "pointer" }, id: account.id, onClick: _this.choose },
              React.createElement(
                "div",
                { className: "soft-ends push-double-left text-left hard-right outlined--light outlined--bottom relative" },
                React.createElement(
                  "div",
                  { className: "display-inline-block soft-half-ends one-whole" },
                  React.createElement(
                    "h6",
                    { className: "flush-bottom float-left text-dark-tertiary" },
                    account.name
                  )
                ),
                React.createElement(
                  "h5",
                  { className: "hard one-whole flush-bottom text-dark-tertiary" },
                  account.payment.accountNumber.slice(0, account.payment.accountNumber.length - 5).replace(/./gmi, "*"),
                  account.payment.accountNumber.slice(-4),
                  React.createElement(
                    "span",
                    { className: "float-right soft-half-left" },
                    React.createElement(_components.AccountType, { width: "40px", height: "25px", type: account.payment.paymentType })
                  )
                )
              ),
              React.createElement(
                "div",
                { className: "locked-ends locked-sides" },
                React.createElement("input", {
                  type: "checkbox",
                  id: "label" + account.id,
                  readOnly: true,
                  checked: Number(account.id) === Number(_this.props.savedAccount.id),
                  style: {
                    opacity: 0,
                    position: "absolute",
                    top: 0,
                    left: 0,
                    padding: "50px"
                  }
                }),
                React.createElement("label", { htmlFor: "label" + account.id, style: {
                    position: "absolute",
                    top: "50%",
                    left: 0
                  } })
              )
            );
          }),
          React.createElement(
            "button",
            { className: "btn one-whole push-double-top soft-sides push-half-bottom", onClick: _this.changeAccounts },
            "Save and Continue"
          ),
          React.createElement(
            "button",
            { className: "btn--small btn--dark-tertiary one-whole soft-sides push-half-ends", onClick: _this.props.goToStepOne },
            "Enter New Payment"
          )
        )
      );
    }, _temp), (0, _possibleConstructorReturn3["default"])(_this, _ret);
  }

  Confirm.prototype.render = function render() {
    var _this2 = this;

    var transactions = [];

    for (var transaction in this.props.transactions) {
      transactions.push(this.props.transactions[transaction]);
    }

    if (this.state.changePayments) {
      return this.renderPaymentOptionsSelect();
    }

    if (Object.keys(this.props.schedules).length) {
      return this.renderScheduleConfirm();
    }

    var personal = this.props.data.personal;


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
        React.createElement(
          "h5",
          { className: "text-dark-secodary text-left" },
          React.createElement(
            "small",
            null,
            React.createElement(
              "em",
              null,
              personal.campus,
              " Campus"
            )
          )
        ),
        React.createElement("div", { className: "outlined--light outlined--bottom one-whole push-bottom" }),
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
              { className: "grid__item one-half", style: { verticalAlign: "middle" } },
              React.createElement(
                "h5",
                { className: "text-dark-secondary flush text-left" },
                "Total"
              )
            ),
            React.createElement(
              "div",
              { className: "grid__item one-half text-right", style: { verticalAlign: "middle" } },
              React.createElement(
                "h3",
                { className: "text-primary flush" },
                this.monentize(this.props.total)
              )
            )
          )
        ),
        React.createElement(
          "button",
          { className: "btn soft-half-top one-whole", type: "submit" },
          this.buttonText(),
          " ",
          this.icon()
        ),
        this.renderPaymentOptions()
      )
    );
  };

  return Confirm;
}(_react.Component), _class.propTypes = {
  data: _react.PropTypes.object.isRequired,
  save: _react.PropTypes.func.isRequired,
  errors: _react.PropTypes.object.isRequired,
  clear: _react.PropTypes.func.isRequired,
  next: _react.PropTypes.func.isRequired
}, _temp2);
exports["default"] = Confirm;
module.exports = exports['default'];