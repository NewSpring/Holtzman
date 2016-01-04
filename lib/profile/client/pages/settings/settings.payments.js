"use strict";

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require("react");

var _reactRedux = require("react-redux");

var _reactMixin = require("react-mixin");

var _reactMixin2 = _interopRequireDefault(_reactMixin);

var _coreClientActions = require("../../../../core/client/actions");

var _coreClientComponents = require("../../../../core/client/components");

var _giveLibCollections = require("../../../../give/lib/collections");

var _giveClientComponents = require("../../../../give/client/components");

/*

  The give now button is presented in the following order:

  1. Give with existing account if found
  2. Give now (if signed in)
  3. Give as guest (in small text) if not signed in

*/

var GiveNow = (function (_Component) {
  _inherits(GiveNow, _Component);

  function GiveNow() {
    _classCallCheck(this, _GiveNow);

    _Component.apply(this, arguments);

    this.remove = function (e) {
      e.preventDefault();

      var id = e.target.id;

      Meteor.call("PaymentAccounts.remove", id, function (err, response) {
        console.log(err, response);
      });
    };
  }

  GiveNow.prototype.componentWillMount = function componentWillMount() {
    this.props.dispatch(_coreClientActions.nav.setLevel("CONTENT"));
  };

  GiveNow.prototype.componentWillUnmount = function componentWillUnmount() {
    this.props.dispatch(_coreClientActions.nav.setLevel("TOP"));
  };

  GiveNow.prototype.getMeteorData = function getMeteorData() {
    var paymentDetails = undefined;

    Meteor.subscribe("paymentDetails");

    return {
      paymentDetails: _giveLibCollections.PaymentDetails.find().fetch()
    };
  };

  GiveNow.prototype.render = function render() {
    var _this = this;

    if (!this.data.paymentDetails) {
      return React.createElement(_coreClientComponents.Loading, null);
    }

    return React.createElement(
      "div",
      { className: "text-center push-double-top soft-double-top@lap-and-up" },
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
          this.data.paymentDetails.map(function (account, key) {
            return React.createElement(
              "div",
              { key: key, className: "soft-ends text-left hard-sides outlined--light outlined--bottom constrain-mobile" },
              React.createElement(
                "h6",
                { className: "soft-half-bottom flush-bottom" },
                account.Name
              ),
              React.createElement(
                "h5",
                { className: "hard one-whole flush-bottom" },
                account.FinancialPaymentDetail.AccountNumberMasked,
                React.createElement(
                  "span",
                  { className: "float-right " },
                  React.createElement(_giveClientComponents.AccountType, { width: "30px", height: "20px", type: account.FinancialPaymentDetail.CreditCardTypeValue.Value }),
                  React.createElement("button", { className: "soft-left icon-close text-alert", id: account.Id, onClick: _this.remove })
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

  var _GiveNow = GiveNow;
  GiveNow = _reactMixin2["default"].decorate(ReactMeteorData)(GiveNow) || GiveNow;
  GiveNow = _reactRedux.connect()(GiveNow) || GiveNow;
  return GiveNow;
})(_react.Component);

exports["default"] = GiveNow;
module.exports = exports["default"];