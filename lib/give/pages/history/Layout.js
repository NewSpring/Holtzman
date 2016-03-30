"use strict";

exports.__esModule = true;
exports["default"] = undefined;

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _class, _temp2;
// import { TransitionMotion, spring, presets } from "react-motion"
// import { VelocityComponent } from "velocity-react"

var _react = require("react");

var _reactRouter = require("react-router");

var _reactDom = require("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _moment = require("moment");

var _moment2 = _interopRequireDefault(_moment);

var _loading = require("../../../core/components/loading");

var _split = require("../../../core/blocks/split");

var _split2 = _interopRequireDefault(_split);

var _meta = require("../../../core/components/meta");

var _meta2 = _interopRequireDefault(_meta);

var _status = require("../../components/status");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function formatDate(date) {
  return (0, _moment2["default"])(date).format("MMM D, YYYY");
}

function monentize(value, fixed) {

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
}

var TransactionDetail = function TransactionDetail(_ref) {
  var transactionDetail = _ref.transactionDetail;
  var transaction = _ref.transaction;
  var icon = _ref.icon;
  var status = _ref.status;
  return React.createElement(
    "div",
    { className: "grid", style: { verticalAlign: "middle" } },
    React.createElement(
      "div",
      { className: "grid__item three-fifths", style: { verticalAlign: "middle" } },
      React.createElement(
        "h5",
        { className: "text-dark-tertiary flush", style: { textOverflow: "ellipsis", whiteSpace: "nowrap" } },
        transactionDetail.account.name
      ),
      React.createElement(
        "p",
        { className: "flush italic small text-dark-tertiary" },
        status ? status + " - " : '',
        formatDate(transaction.date)
      )
    ),
    React.createElement(
      "div",
      { className: "grid__item two-fifths text-right", style: { verticalAlign: "middle" } },
      React.createElement(
        "div",
        { className: "soft-half-right" },
        React.createElement(
          "h4",
          { className: "text-dark-tertiary one-whole flush soft-right@handheld soft-double-right@lap-and-up", style: {
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap"
            }
          },
          monentize(transactionDetail.amount),
          function () {
            if (icon) {
              return React.createElement("span", { className: "text-primary icon-arrow-next locked", style: {
                  right: "-5px",
                  top: "1px"
                } });
            }
          }()
        )
      )
    )
  );
};

var TransactionCard = function TransactionCard(_ref2) {
  var transactionDetail = _ref2.transactionDetail;
  var transaction = _ref2.transaction;
  var status = transaction.status;

  /*
     turn on a couple pendings for UI testing
   */

  if (status && status.toLowerCase().indexOf('pending') > -1) {
    return React.createElement(
      "div",
      {
        className: "soft card",
        style: {
          borderStyle: "solid",
          borderColor: "f1f1f1",
          boxShadow: "none",
          borderWidth: "2px",
          backgroundColor: "transparent"
        }
      },
      React.createElement(TransactionDetail, {
        transactionDetail: transactionDetail,
        transaction: transaction,
        icon: false,
        status: "Pending"
      })
    );
  }
  return React.createElement(
    "div",
    { className: "soft card" },
    React.createElement(
      _reactRouter.Link,
      { to: "/give/history/" + transaction.id + "/" + transactionDetail.account.id },
      React.createElement(TransactionDetail, {
        transactionDetail: transactionDetail,
        transaction: transaction,
        icon: true
      })
    )
  );
};

var Layout = (_temp2 = _class = function (_Component) {
  (0, _inherits3["default"])(Layout, _Component);

  function Layout() {
    var _temp, _this, _ret;

    (0, _classCallCheck3["default"])(this, Layout);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3["default"])(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.monentize = monentize, _this.formatDate = formatDate, _temp), (0, _possibleConstructorReturn3["default"])(_this, _ret);
  }

  Layout.prototype.componentDidMount = function componentDidMount() {
    var container = _reactDom2["default"].findDOMNode(this.refs["container"]);
    container.addEventListener("scroll", this.props.onScroll);
    if (typeof window != "undefined" && window != null) {
      window.addEventListener("scroll", this.props.onScroll);
    }
  };

  Layout.prototype.componentWillUnmount = function componentWillUnmount() {
    var container = _reactDom2["default"].findDOMNode(this.refs["container"]);
    container.removeEventListener("scroll", this.props.onScroll);

    if (typeof window != "undefined" && window != null) {
      window.removeEventListener("scroll", this.props.onScroll);
    }
  };

  Layout.prototype.render = function render() {
    var _props = this.props;
    var transactions = _props.transactions;
    var ready = _props.ready;


    return React.createElement(
      "div",
      null,
      React.createElement(
        _split2["default"],
        { nav: true, classes: ["background--light-primary"] },
        React.createElement(_meta2["default"], { title: "Giving History" }),
        React.createElement(_split.Right, { background: "//dg0ddngxdz549.cloudfront.net/images/cached/images/remote/http_s3.amazonaws.com/ns.images/newspring/_fpo/NScollege-cip-0033_1700_1133_90_c1.jpg",
          mobile: false })
      ),
      React.createElement(
        _split.Left,
        { scroll: true, ref: "container", classes: ["background--light-secondary"] },
        React.createElement(
          "div",
          { className: "soft-double-sides@lap-and-up soft-ends@lap-and-up background--light-primary" },
          React.createElement(
            "div",
            { className: "soft soft-double-ends hard-left@lap-and-up" },
            React.createElement(
              "h2",
              { className: "flush hard" },
              "Giving History"
            ),
            React.createElement(
              "p",
              { className: "flush-bottom soft-top" },
              React.createElement(
                "small",
                null,
                React.createElement(
                  "em",
                  null,
                  "Currently we only support viewing your personal giving history, and not the history of your family. We are working hard to bring this ability, but in the meantime, if you sign into the site using the email of the family member you would like to see, you can view their history and schedules there. If you have any questions please ",
                  React.createElement(
                    "a",
                    { href: "//rock.newspring.cc/workflows/152?Topic=Stewardship", target: "_blank" },
                    "let us know!"
                  )
                )
              )
            )
          )
        ),
        React.createElement(
          "div",
          { className: "soft-half soft@portable soft-double@anchored soft-double-bottom@anchored soft-bottom@portable", ref: "history" },
          function () {

            // if (!alive) {
            //   return <Offline />
            // }

            if (!transactions.length && !ready) {
              // loading
              return React.createElement(
                "div",
                { className: "text-center soft" },
                React.createElement(_loading.Spinner, { styles: { width: "40px", height: "40px" } })
              );
            } else if (!transactions.length && ready) {
              return React.createElement(
                "div",
                { className: "text-left soft-ends" },
                React.createElement(
                  "p",
                  null,
                  "We didn't find any contributions associated with your account. If you would like to start giving, click ",
                  React.createElement(
                    _reactRouter.Link,
                    { to: "/give/now" },
                    "here"
                  )
                ),
                React.createElement(
                  "p",
                  null,
                  React.createElement(
                    "em",
                    null,
                    "If you have any questions, please call our Finance Team at 864-965-9990 or ",
                    React.createElement(
                      "a",
                      { target: "_blank", href: "//rock.newspring.cc/workflows/152?Topic=Stewardship" },
                      "contact us "
                    ),
                    " and someone will be happy to assist you."
                  )
                )
              );
            }

            var lastYear = null;
            return React.createElement(
              "div",
              null,
              transactions.map(function (transaction, key) {
                var details = transaction.details;

                return React.createElement(
                  "div",
                  { key: key },
                  details.map(function (transactionDetail, i) {
                    if (!transactionDetail.account) {
                      return null;
                    }

                    if (Number(transactionDetail.amount) <= 0) {
                      return null;
                    }

                    var year = (0, _moment2["default"])(transaction.date).year();
                    if (year != lastYear) {
                      lastYear = year;
                      return React.createElement(
                        "div",
                        { key: i },
                        React.createElement(
                          "div",
                          { className: "soft text-left" },
                          React.createElement(
                            "h5",
                            null,
                            year
                          )
                        ),
                        React.createElement(TransactionCard, {
                          transaction: transaction,
                          transactionDetail: transactionDetail
                        })
                      );
                    }

                    return React.createElement(TransactionCard, {
                      transaction: transaction,
                      transactionDetail: transactionDetail,
                      key: i
                    });
                  })
                );
              })
            );
          }()
        )
      )
    );
  };

  return Layout;
}(_react.Component), _class.contextTypes = {
  shouldAnimate: _react.PropTypes.bool
}, _temp2);
exports["default"] = Layout;
module.exports = exports['default'];