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

// loading state

var _coreClientComponentsLoading = require("../../../../core/client/components/loading");

var _coreClientBlocks = require("../../../../core/client/blocks");

var _coreClientActions = require("../../../../core/client/actions");

var _coreClientLayoutsSplit = require("../../../../core/client/layouts/split");

var _libCollections = require("../../../lib/collections");

var _historyDetails = require("./history.Details");

var _historyDetails2 = _interopRequireDefault(_historyDetails);

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
          if (_this.state.page * _this.state.pageSize > _this.data.transactions.length) {
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
      window.removeEventListener("scroll", this.pageOnScroll);
    }
  };

  Template.prototype.getMeteorData = function getMeteorData() {
    Meteor.subscribe("transactions");
    var transactions = _libCollections.Transactions.find({}, {
      limit: this.state.page * this.state.pageSize,
      sort: { CreatedDateTime: -1 }
    }).fetch();

    return {
      transactions: transactions
    };
  };

  Template.prototype.render = function render() {
    var _this2 = this;

    return React.createElement(
      _coreClientLayoutsSplit.Split,
      { nav: true },
      React.createElement(_coreClientLayoutsSplit.Right, { background: "//dg0ddngxdz549.cloudfront.net/images/cached/images/remote/http_s3.amazonaws.com/ns.images/newspring/_fpo/NScollege-cip-0033_1700_1133_90_c1.jpg",
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
              "Giving History"
            )
          )
        ),
        React.createElement(
          "div",
          { className: "constrain-copy soft soft-double-sides@lap-and-up hard-top", ref: "history" },
          (function () {
            var transactions = _this2.data.transactions;

            if (!transactions || !transactions.length) {
              // loading
              return React.createElement(
                "div",
                { className: "text-center soft" },
                React.createElement(_coreClientComponentsLoading.Spinner, { styles: { width: "40px", height: "40px" } })
              );
            }

            return _this2.data.transactions.map(function (transaction, i) {
              if (!transaction.TransactionDetails.length) {
                return null;
              }

              return transaction.TransactionDetails.map(function (transactionDetail, i) {
                if (!transactionDetail.Account) {
                  return null;
                }

                return React.createElement(
                  "div",
                  { key: i, className: "soft-ends push-half-ends hard-sides outlined--light outlined--bottom constrain-mobile" },
                  React.createElement(
                    _reactRouter.Link,
                    { to: "/give/history/" + transaction.Id + "/" + transactionDetail.Account.Id },
                    React.createElement(
                      "div",
                      { className: "grid", style: { verticalAlign: "middle" }, key: i },
                      React.createElement(
                        "div",
                        { className: "grid__item one-half", style: { verticalAlign: "middle" } },
                        React.createElement(
                          "h5",
                          { className: "text-dark-tertiary flush" },
                          transactionDetail.Account.PublicName
                        ),
                        React.createElement(
                          "p",
                          { className: "flush soft-half-top italic small text-dark-tertiary" },
                          _this2.formatDate(transaction.CreatedDateTime)
                        )
                      ),
                      React.createElement(
                        "div",
                        { className: "grid__item one-half text-right", style: { verticalAlign: "middle" } },
                        React.createElement(
                          "div",
                          { className: "soft-half-right" },
                          React.createElement(
                            "h4",
                            { className: "text-dark-tertiary flush soft-right@handheld soft-double-right@lap-and-up" },
                            _this2.monentize(transactionDetail.Amount),
                            React.createElement("span", { className: "text-primary icon-arrow-next locked", style: {
                                right: "-5px",
                                top: "1px"
                              } })
                          )
                        )
                      )
                    )
                  )
                );
              });
            });
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

var Routes = [{
  path: "history",
  component: _coreClientBlocks.Authorized,
  indexRoute: { component: Template },
  childRoutes: [{
    path: ":id/:account",
    component: _historyDetails2["default"]
  }]
}];

exports["default"] = {
  Template: Template,
  Routes: Routes
};
module.exports = exports["default"];