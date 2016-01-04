"use strict";

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require("react");

var _reactRedux = require("react-redux");

var _coreClientComponents = require("../../../../core/client/components");

var _actionButtons = require("./../action-buttons");

var _actionButtons2 = _interopRequireDefault(_actionButtons);

var _addToCartSubfund = require("./add-to-cart.subfund");

var _addToCartSubfund2 = _interopRequireDefault(_addToCartSubfund);

var _addToCartStylesCss = require("./add-to-cart.styles.css");

var _addToCartStylesCss2 = _interopRequireDefault(_addToCartStylesCss);

var _actions = require("../../actions");

// We only care about the give state
function mapStateToProps(state) {
  return {
    give: state.give
  };
}

var CartContainer = (function (_Component) {
  _inherits(CartContainer, _Component);

  function CartContainer() {
    var _this = this;

    _classCallCheck(this, _CartContainer);

    _Component.apply(this, arguments);

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

    this.format = function (value, target) {
      var _props$addTransactions;

      var id = target.id;
      var name = target.name;

      value = _this.monentize(value);

      _this.props.addTransactions((_props$addTransactions = {}, _props$addTransactions[id] = {
        value: Number(value.replace(/[^0-9\.]+/g, '')),
        label: name
      }, _props$addTransactions));

      return value;
    };

    this.saveData = function (value, target) {
      var _props$addTransactions2;

      var id = target.id;
      var name = target.name;

      value = _this.monentize(value);

      _this.props.addTransactions((_props$addTransactions2 = {}, _props$addTransactions2[id] = {
        value: Number(value.replace(/[^0-9\.]+/g, '')),
        label: name
      }, _props$addTransactions2));

      return true;
    };
  }

  CartContainer.prototype.render = function render() {
    var _this2 = this;

    var _props$give = this.props.give;
    var total = _props$give.total;
    var transactions = _props$give.transactions;

    var primaryAccount = {};
    var remainingAccounts = [];
    var otherAccounts = [];

    if (this.props.accounts.length) {

      for (var _iterator = this.props.accounts, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
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

        if (account.Order === 0 && !Object.keys(primaryAccount).length) {
          primaryAccount = account;
          continue;
        }

        otherAccounts.push(account);

        if (transactions[account.Id]) {
          continue;
        }

        remainingAccounts.push(account);
      }
    }

    var mulitpleAccounts = this.props.accounts && this.props.accounts.length > 1;

    return React.createElement(
      "div",
      { className: "push-top@handheld soft-half-top@lap-and-up" },
      React.createElement(
        _coreClientComponents.Forms.Form,
        {
          classes: ["text-left", "hard"],
          submit: function (e) {
            e.preventDefault();
          },
          id: "add-to-cart"
        },
        React.createElement(
          "h3",
          { className: "text-dark-tertiary display-inline-block push-half-bottom push-half-right" },
          "I'd like to ",
          (function () {
            if (_this2.props.accounts.length > 1) {
              return "tithe";
            }

            return "give";
          })()
        ),
        React.createElement(_coreClientComponents.Forms.Input, {
          id: primaryAccount.Id || -1,
          name: primaryAccount.Name || "primary-account",
          type: "tel",
          hideLabel: true,
          ref: "primary-account",
          classes: ["soft-bottom", "input--active", "display-inline-block"],
          inputClasses: "outlined--dotted outlined--light h3 hard-top flush-bottom text-dark-primary " + _addToCartStylesCss2["default"]["show-placeholder"],
          placeholder: "$0.00",
          validate: this.saveData,
          format: this.format
        }),
        React.createElement("div", { className: "clearfix" }),
        React.createElement(
          "div",
          { className: "display-inline-block" },
          (function () {

            if (mulitpleAccounts || !_this2.props.accounts.length) {
              var _transactions = _extends({}, _this2.props.give.transactions);
              if (primaryAccount.Id) {
                delete _transactions[primaryAccount.Id];
              } else {
                delete _transactions[-1];
              }

              return React.createElement(
                "div",
                null,
                (function () {

                  // for (let transaction in this.props.give.transactions) {
                  //   return (
                  //     <SubFund
                  //       accounts={otherAccounts}
                  //       transaction={this.props.give.transactions[transaction]}
                  //     />
                  //   )
                  // }
                  return React.createElement(_addToCartSubfund2["default"], {
                    accounts: otherAccounts
                  });
                })(),
                React.createElement("div", { className: "clearfix" })
              );
            }

            return React.createElement(
              "h3",
              { className: "text-dark-tertiary display-inline-block push-half-bottom" },
              "to " + (_this2.props.accounts[0].PublicName || _this2.props.accounts[0].Name) + " ",
              " "
            );
          })(),
          React.createElement(
            "h3",
            { className: "display-inline-block text-dark-tertiary push-half-bottom push-half-right" },
            "so my gift total is"
          ),
          React.createElement(
            "h3",
            { className: "display-inline-block text-brand push-half-bottom" },
            this.monentize(total, true)
          )
        ),
        React.createElement(
          "div",
          { className: "push-top" },
          React.createElement(_actionButtons2["default"], {
            disabled: total <= 0
          })
        )
      )
    );
  };

  var _CartContainer = CartContainer;
  CartContainer = _reactRedux.connect(mapStateToProps, _actions.give)(CartContainer) || CartContainer;
  return CartContainer;
})(_react.Component);

exports["default"] = CartContainer;
module.exports = exports["default"];