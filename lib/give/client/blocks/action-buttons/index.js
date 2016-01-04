"use strict";

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require("react");

var _reactRedux = require("react-redux");

var _reactMixin = require("react-mixin");

var _reactMixin2 = _interopRequireDefault(_reactMixin);

var _coreClientBlocks = require("../../../../core/client/blocks");

var _coreClientActions = require("../../../../core/client/actions");

var _give = require("../give");

var _give2 = _interopRequireDefault(_give);

var _components = require("../../components");

var _libCollections = require("../../../lib/collections");

var _actions = require("../../actions");

/*

  The give now button is presented in the following order:

  1. Give with existing account if found
  2. Give now (if signed in)
  3. Give as guest (in small text) if not signed in

*/

var GiveNow = (function (_Component) {
  _inherits(GiveNow, _Component);

  function GiveNow() {
    var _this = this;

    _classCallCheck(this, _GiveNow);

    _Component.apply(this, arguments);

    this.buttonClasses = function () {
      var classes = ["btn"];

      if (_this.data.paymentDetails) {
        classes.push("has-card");
      }

      if (_this.props.disabled) {
        classes.push("btn--disabled");
      }
      if (_this.props.classes) {
        classes = classes.concat(_this.props.classes);
      }

      return classes.join(" ");
    };

    this.click = function () {
      if (_this.data.authorized) {
        _this.props.dispatch(_coreClientActions.modal.render(_give2["default"]));
      } else {
        _this.props.dispatch(_coreClientActions.modal.render(_coreClientBlocks.OnBoard));

        _this.props.dispatch(_coreClientActions.onBoard.setAccount(true));
      }

      _this.props.dispatch(_coreClientActions.nav.setLevel("MODAL"));

      if (_this.data.paymentDetails) {
        _this.props.dispatch(_actions.give.setAccount(_this.data.paymentDetails.TransactionCode));
      }
    };

    this.register = function () {
      _this.props.dispatch(_coreClientActions.modal.render(_coreClientBlocks.OnBoard));
      _this.props.dispatch(_coreClientActions.onBoard.setAccount(false));
      _this.props.dispatch(_coreClientActions.nav.setLevel("MODAL"));
    };

    this.buttonText = function () {

      var text = "Give Now";

      if (_this.data.paymentDetails) {
        var details = _this.data.paymentDetails;
        var AccountNumberMasked = details.FinancialPaymentDetail.AccountNumberMasked;

        AccountNumberMasked = AccountNumberMasked.slice(-4).trim();

        text += " using " + AccountNumberMasked;
      }

      if (!_this.data.authorized) {
        text = "Sign In";
      }

      return text;
    };

    this.icon = function () {

      if (_this.data.paymentDetails) {
        var details = _this.data.paymentDetails;

        if (details.FinancialPaymentDetail.CurrencyTypeValue && details.FinancialPaymentDetail.CurrencyTypeValue.Description === "Credit Card") {
          return(
            // replace with SVG
            React.createElement(_components.AccountType, { width: "30px", height: "20px", type: details.FinancialPaymentDetail.CreditCardTypeValue.Value })
          );
        } else {

          return(
            // replace with SVG
            React.createElement(_components.AccountType, { width: "30px", height: "20px", type: "Bank" })
          );
        }
      }
    };

    this.secondaryButton = function () {
      if (!_this.data.authorized) {
        return React.createElement(
          "button",
          { className: "btn--thin btn--dark-tertiary btn--small display-inline-block push-left@lap-and-up push-half-left@handheld", onClick: _this.register },
          "Register"
        );
      }
    };
  }

  GiveNow.prototype.getMeteorData = function getMeteorData() {
    var paymentDetails = undefined;

    Meteor.subscribe("paymentDetails");
    var details = _libCollections.PaymentDetails.find().fetch();
    return {
      paymentDetails: details[0],
      authorized: Meteor.user()
    };
  };

  GiveNow.prototype.render = function render() {
    return React.createElement(
      "div",
      null,
      React.createElement(
        "button",
        {
          className: this.props.theme || this.buttonClasses(),
          styles: this.props.styles || {},
          onClick: this.click,
          disabled: this.props.disabled
        },
        this.buttonText(),
        " ",
        this.icon()
      ),
      this.secondaryButton()
    );
  };

  var _GiveNow = GiveNow;
  GiveNow = _reactMixin2["default"].decorate(ReactMeteorData)(GiveNow) || GiveNow;
  GiveNow = _reactRedux.connect()(GiveNow) || GiveNow;
  return GiveNow;
})(_react.Component);

exports["default"] = GiveNow;
module.exports = exports["default"];