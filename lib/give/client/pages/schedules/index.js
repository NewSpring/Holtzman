"use strict";

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require("react");

var _reactRouter = require("react-router");

var _reactDom = require("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRedux = require("react-redux");

var _reactMixin = require("react-mixin");

var _reactMixin2 = _interopRequireDefault(_reactMixin);

var _moment = require("moment");

var _moment2 = _interopRequireDefault(_moment);

var _rockLibApi = require("../../../../rock/lib/api");

// loading state

var _coreClientComponentsLoading = require("../../../../core/client/components/loading");

var _coreClientBlocks = require("../../../../core/client/blocks");

var _coreClientActions = require("../../../../core/client/actions");

var _coreClientLayoutsSplit = require("../../../../core/client/layouts/split");

var _libCollections = require("../../../lib/collections");

var _blocks = require("../../blocks");

var _scheduleDetails = require("./schedule.Details");

var _scheduleDetails2 = _interopRequireDefault(_scheduleDetails);

var Template = (function (_Component) {
  _inherits(Template, _Component);

  function Template() {
    var _this = this;

    _classCallCheck(this, _Template);

    _Component.apply(this, arguments);

    this.state = {
      page: 1,
      pageSize: 20,
      shouldUpdate: true,
      done: false
    };

    this.pageOnScroll = function (e) {
      if (_this.state.done) return;

      var _e$target = e.target;
      var scrollHeight = _e$target.scrollHeight;
      var clientHeight = _e$target.clientHeight;
      var scrollTop = _e$target.scrollTop;
      var offsetTop = _e$target.offsetTop;

      var percentage = undefined;

      if (scrollTop && scrollHeight) {
        percentage = scrollTop / scrollHeight;
      } else if (window.scrollY && document.body.clientHeight) {
        percentage = window.scrollY, document.body.clientHeight;
      }

      if (percentage > 0.5 && _this.state.shouldUpdate) {
        _this.setState({
          page: _this.state.page + 1,
          shouldUpdate: false
        });

        // wait a bit to prevent paging multiple times
        setTimeout(function () {
          if (_this.state.page * _this.state.pageSize > _this.data.schedules.length) {
            _this.setState({ done: true, shouldUpdate: false });
          } else {
            _this.setState({ shouldUpdate: true });
          }
        }, 1000);
      }
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

  // componentWillMount() {
  //   this.props.dispatch(navActions.setLevel("CONTENT"))
  //
  // }
  //
  // componentWillUnmount() {
  //   this.props.dispatch(navActions.setLevel("TOP"))
  // }

  Template.prototype.componentDidMount = function componentDidMount() {
    var container = _reactDom2["default"].findDOMNode(this.refs["container"]);
    container.addEventListener("scroll", this.pageOnScroll);
    if (typeof window != "undefined" && window != null) {
      window.addEventListener("scroll", this.pageOnScroll);
    }
  };

  Template.prototype.componentWillUnmount = function componentWillUnmount() {
    var container = _reactDom2["default"].findDOMNode(this.refs["container"]);
    container.removeEventListener("scroll", this.pageOnScroll);
    if (typeof window != "undefined" && window != null) {
      window.addEventListener("scroll", this.pageOnScroll);
    }
  };

  Template.prototype.getMeteorData = function getMeteorData() {
    var subscription = Meteor.subscribe("scheduledTransactions");
    var schedules = _libCollections.ScheduledTransactions.find({}, {
      limit: this.state.page * this.state.pageSize,
      sort: { CreatedDateTime: -1 }
    }).fetch();

    var accounts = undefined;

    if (Meteor.isClient) {
      Meteor.subscribe("accounts");
      accounts = _libCollections.Accounts.find().fetch();
    }

    if (Meteor.isServer) {
      accounts = _rockLibApi.api.get.sync(_rockLibApi.endpoints.accounts);
    }

    var ready = subscription.ready();

    return {
      schedules: schedules,
      accounts: accounts,
      ready: ready
    };
  };

  Template.prototype.render = function render() {
    var _this2 = this;

    return React.createElement(
      _coreClientLayoutsSplit.Split,
      { nav: true },
      React.createElement(_coreClientLayoutsSplit.Right, {
        background: "//dg0ddngxdz549.cloudfront.net/images/cached/images/remote/http_s3.amazonaws.com/ns.images/newspring/give/giveyourbrainabreak2_1000_1000_90.jpg",
        mobile: false }),
      React.createElement(
        _coreClientLayoutsSplit.Left,
        { scroll: true, ref: "container" },
        React.createElement(
          "div",
          { className: "constrain-copy soft-double-sides@lap-and-up soft-double-top@lap-and-up" },
          React.createElement(
            "div",
            { className: "soft soft-double-top hard-left@lap-and-up soft-half-bottom" },
            React.createElement(
              "h2",
              { className: "flush hard" },
              "Recurring Gifts"
            )
          )
        ),
        React.createElement(
          "div",
          { className: "constrain-copy soft soft-double-sides@lap-and-up hard-top" },
          React.createElement(
            "div",
            { className: "outlined--light outlined--bottom soft-ends soft-double-bottom" },
            React.createElement(_blocks.AddSchedule, { accounts: this.data.accounts })
          )
        ),
        React.createElement(
          "div",
          { className: "constrain-copy soft soft-double-sides@lap-and-up hard-top", ref: "history" },
          React.createElement(
            "h4",
            { className: "soft-double-top text-center" },
            "My Active Gifts"
          ),
          (function () {
            var _data = _this2.data;
            var schedules = _data.schedules;
            var ready = _data.ready;

            if (!schedules.length && !ready) {
              // loading
              return React.createElement(
                "div",
                { className: "text-center soft" },
                React.createElement(_coreClientComponentsLoading.Spinner, { styles: { width: "40px", height: "40px" } })
              );
            }

            if (!schedules.length && ready) {
              return React.createElement(
                "div",
                { className: "text-center soft" },
                React.createElement(
                  "p",
                  null,
                  React.createElement(
                    "em",
                    null,
                    "You don't have any active recurring gifts"
                  )
                )
              );
            }

            return React.createElement(
              "div",
              null,
              _this2.data.schedules.map(function (schedule, i) {

                if (!schedule.ScheduledTransactionDetails[0].Account) {
                  return null;
                }
                return React.createElement(
                  "div",
                  { key: i, className: "soft-ends push-half-ends hard-sides outlined--light outlined--bottom constrain-mobile" },
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
                  React.createElement(
                    _reactRouter.Link,
                    { to: "/give/recurring/" + schedule.Id, className: "btn" },
                    "View Details"
                  )
                );
              })
            );
          })()
        )
      )
    );
  };

  var _Template = Template;
  Template = _reactMixin2["default"].decorate(ReactMeteorData)(Template) || Template;
  Template = _reactRedux.connect()(Template) || Template;
  return Template;
})(_react.Component);

exports["default"] = Template;

var Routes = [{ path: "recurring", component: Template }, {
  path: "recurring/:id",
  component: _coreClientBlocks.Authorized,
  indexRoute: { component: _scheduleDetails2["default"] }
}];

exports["default"] = {
  Template: Template,
  Routes: Routes
};
module.exports = exports["default"];