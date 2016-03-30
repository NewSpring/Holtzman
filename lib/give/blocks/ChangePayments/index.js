"use strict";

exports.__esModule = true;
exports["default"] = undefined;

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _dec, _class;

var _react = require("react");

var _reactRedux = require("react-redux");

var _store = require("../../store");

var _store2 = require("../../../core/store");

var _accountType = require("../../components/accountType");

var _accountType2 = _interopRequireDefault(_accountType);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var map = function map(state) {
  return {
    savedAccount: state.give.savedAccount
  };
};
var ChangePayments = (_dec = (0, _reactRedux.connect)(map), _dec(_class = function (_Component) {
  (0, _inherits3["default"])(ChangePayments, _Component);

  function ChangePayments() {
    var _temp, _this, _ret;

    (0, _classCallCheck3["default"])(this, ChangePayments);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3["default"])(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.state = {
      savedAccount: null
    }, _this.changePaymentHeader = function () {
      return React.createElement(
        "h4",
        { className: "text-center flush-bottom" },
        "Change Payment Account"
      );
    }, _this.changeAccounts = function (e) {
      e.preventDefault();

      _this.props.dispatch(_store.give.setAccount(_this.state.savedAccount));
      _this.props.dispatch(_store2.modal.hide());
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

      _this.setState({
        savedAccount: act
      });
    }, _temp), (0, _possibleConstructorReturn3["default"])(_this, _ret);
  }

  ChangePayments.prototype.render = function render() {
    var _this2 = this;

    var selectedAccount = this.props.currentAccount;
    if (this.state.savedAccount) {
      selectedAccount = this.state.savedAccount;
    }

    return React.createElement(
      "div",
      { className: "soft-double-top" },
      React.createElement(
        "div",
        { className: "soft-sides flush-bottom push-double-top@lap-and-up" },
        this.changePaymentHeader()
      ),
      React.createElement(
        "div",
        { className: "soft" },
        this.props.savedAccounts.map(function (account, key) {
          return React.createElement(
            "div",
            { key: key, style: { position: "relative", cursor: "pointer" }, id: account.id, onClick: _this2.choose },
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
                  React.createElement(_accountType2["default"], { width: "40px", height: "25px", type: account.payment.paymentType })
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
                checked: Number(account.id) === Number(selectedAccount.id),
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
          { className: "btn one-whole push-double-top soft-sides push-bottom", onClick: this.changeAccounts },
          "Change Account"
        ),
        React.createElement(
          "p",
          null,
          React.createElement(
            "small",
            null,
            React.createElement(
              "em",
              null,
              "You can enter a new payment account before confirming your contribution."
            )
          )
        )
      )
    );
  };

  return ChangePayments;
}(_react.Component)) || _class);
exports["default"] = ChangePayments;
module.exports = exports['default'];