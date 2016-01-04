"use strict";

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require("react");

var _reactMixin = require("react-mixin");

var _reactMixin2 = _interopRequireDefault(_reactMixin);

var _reactRedux = require("react-redux");

var _moment = require("moment");

var _moment2 = _interopRequireDefault(_moment);

var _reactRouter = require("react-router");

// loading state

var _coreClientComponentsLoading = require("../../../../core/client/components/loading");

var _coreClientActions = require("../../../../core/client/actions");

var _coreClientLayoutsSplit = require("../../../../core/client/layouts/split");

var _coreClientComponents = require("../../../../core/client/components");

var _components = require("../../components");

var _libCollections = require("../../../lib/collections");

var map = function map(state) {
  return { person: state.onBoard.person };
};

var Details = (function (_Component) {
  _inherits(Details, _Component);

  function Details() {
    var _this = this;

    _classCallCheck(this, _Details);

    _Component.apply(this, arguments);

    this.state = {
      isActive: true
    };

    this.stop = function (e) {
      e.preventDefault();

      var _data$schedule = _this.data.schedule;
      var Id = _data$schedule.Id;
      var GatewayScheduleId = _data$schedule.GatewayScheduleId;

      _this.setState({ isActive: false });
      Meteor.call("Give.schedule.cancel", { Id: Id, GatewayScheduleId: GatewayScheduleId }, function (err, response) {});
    };

    this.formatDate = function (date) {
      return _moment2["default"](date).format("MMM D, YYYY");
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

    this.capitalizeFirstLetter = function (string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    };
  }

  Details.prototype.componentWillMount = function componentWillMount() {
    this.props.dispatch(_coreClientActions.nav.setLevel("CONTENT"));
  };

  Details.prototype.componentWillUnmount = function componentWillUnmount() {
    this.props.dispatch(_coreClientActions.nav.setLevel("TOP"));
  };

  Details.prototype.getMeteorData = function getMeteorData() {
    Meteor.subscribe("scheduledTransactions");
    var id = this.props.params.id;

    var schedule = _libCollections.ScheduledTransactions.findOne({ Id: Number(id) });
    return {
      schedule: schedule
    };
  };

  Details.prototype.render = function render() {
    var _this2 = this;

    return React.createElement(
      _coreClientLayoutsSplit.Split,
      { nav: true },
      React.createElement(_coreClientLayoutsSplit.Right, { background: "https://dg0ddngxdz549.cloudfront.net/images/cached/images/remote/http_dg0ddngxdz549.cloudfront.net/images/cached/images/remote/http_s3.amazonaws.com/ns.images/newspring/collection/series_newspring/v4.sermonseries.graphics.1to1.more_1700_1700_90_c1_1700_1700_90_c1.jpg",
        mobile: false }),
      React.createElement(
        _coreClientLayoutsSplit.Left,
        { scroll: true, ref: "container" },
        React.createElement(
          "div",
          { className: "constrain-copy soft soft-double@lap-and-up push-double@lap-and-up" },
          (function () {
            var schedule = _this2.data.schedule;

            if (!schedule) {
              // loading
              return React.createElement(
                "div",
                { className: "text-center soft" },
                React.createElement(_coreClientComponentsLoading.Spinner, { styles: { width: "40px", height: "40px" } })
              );
            }

            return React.createElement(
              "div",
              { className: "soft-ends push-half-ends hard-sides constrain-mobile" },
              React.createElement(
                "h3",
                { className: "text-dark-tertiary", style: { lineHeight: "1.75" } },
                React.createElement(
                  "span",
                  { className: "text-dark-secondary" },
                  _this2.capitalizeFirstLetter(schedule.TransactionFrequencyValue.Description.toLowerCase())
                ),
                ", I give ",
                React.createElement(
                  "span",
                  { className: "text-dark-secondary" },
                  _this2.monentize(schedule.ScheduledTransactionDetails[0].Amount)
                ),
                " to ",
                React.createElement(
                  "span",
                  { className: "text-primary" },
                  schedule.ScheduledTransactionDetails[0].Account.PublicName
                ),
                ". This began on ",
                React.createElement(
                  "span",
                  { className: "text-dark-secondary" },
                  _this2.formatDate(schedule.StartDate)
                ),
                " using my ",
                React.createElement(
                  "span",
                  { className: "text-dark-secondary" },
                  schedule.FinancialPaymentDetail.CreditCardTypeValue.Description.toLowerCase()
                ),
                " ending in ",
                React.createElement(
                  "span",
                  { className: "text-dark-secondary" },
                  schedule.FinancialPaymentDetail.AccountNumberMasked.slice(-4)
                )
              ),
              (function () {
                if (_this2.state.isActive) {
                  return React.createElement(
                    "button",
                    { className: "btn--alert btn--thin btn--small", onClick: _this2.stop },
                    "Stop gift"
                  );
                }
              })()
            );
          })(),
          React.createElement("div", { className: "outlined--light outlined--top push-double-ends" }),
          React.createElement(
            "p",
            null,
            "Thank you so much for your gifts! It is because of your generosity we are able to continue telling stories of the greatness of Jesus and seeing peoples lives changed."
          )
        )
      )
    );
  };

  var _Details = Details;
  Details = _reactMixin2["default"].decorate(ReactMeteorData)(Details) || Details;
  Details = _reactRedux.connect(map)(Details) || Details;
  return Details;
})(_react.Component);

exports["default"] = Details;
module.exports = exports["default"];