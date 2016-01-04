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
    _classCallCheck(this, _Details);

    _Component.apply(this, arguments);

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

  Details.prototype.componentWillMount = function componentWillMount() {
    this.props.dispatch(_coreClientActions.nav.setLevel("CONTENT"));
  };

  Details.prototype.componentWillUnmount = function componentWillUnmount() {
    this.props.dispatch(_coreClientActions.nav.setLevel("TOP"));
  };

  Details.prototype.getMeteorData = function getMeteorData() {
    Meteor.subscribe("transactions");
    var _props$params = this.props.params;
    var id = _props$params.id;
    var account = _props$params.account;

    var transaction = _libCollections.Transactions.findOne({ Id: Number(id) });

    if (transaction) {
      var TransactionDetails = transaction.TransactionDetails;

      if (TransactionDetails.length) {
        for (var _iterator = TransactionDetails, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
          var _ref;

          if (_isArray) {
            if (_i >= _iterator.length) break;
            _ref = _iterator[_i++];
          } else {
            _i = _iterator.next();
            if (_i.done) break;
            _ref = _i.value;
          }

          var detail = _ref;

          if (detail.AccountId === Number(account)) {
            TransactionDetails = [detail];
            break;
          }
        }
      }
      transaction.TransactionDetails = TransactionDetails;
    }

    return {
      transaction: transaction
    };
  };

  Details.prototype.render = function render() {
    var _this = this;

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
            var transaction = _this.data.transaction;
            var person = _this.props.person;

            if (!transaction) {
              // loading
              return React.createElement(
                "div",
                { className: "text-center soft" },
                React.createElement(_coreClientComponentsLoading.Spinner, { styles: { width: "40px", height: "40px" } })
              );
            }

            return React.createElement(
              "div",
              { className: "text-center push-bottom@lap-and-up" },
              React.createElement(
                "p",
                { className: "push-half-bottom" },
                React.createElement(
                  "em",
                  null,
                  _this.formatDate(transaction.CreatedDateTime)
                )
              ),
              React.createElement(
                "h3",
                { className: "text-dark-secondary" },
                transaction.TransactionDetails[0].Account.PublicName
              ),
              React.createElement(
                "h1",
                { className: "text-dark-primary" },
                _this.monentize(transaction.TransactionDetails[0].Amount)
              ),
              React.createElement(
                "h6",
                { className: "push-bottom text-dark-tertiary" },
                person.FirstName,
                " ",
                person.LastName
              ),
              (function () {
                var detail = transaction.FinancialPaymentDetail;
                if (detail.AccountNumberMasked) {
                  return React.createElement(
                    "h4",
                    { className: "text-dark-secondary" },
                    detail.AccountNumberMasked.slice(-4),
                    (function () {
                      if (detail.CreditCardTypeValue && detail.CreditCardTypeValue.Value) {
                        return React.createElement(_components.AccountType, { width: "30px", height: "20px", type: detail.CreditCardTypeValue.Value });
                      } else if (detail.CurrencyTypeValue && detail.CurrencyTypeValue.Value === "ACH") {
                        return React.createElement(_components.AccountType, { width: "30px", height: "20px", type: "Bank" });
                      }
                    })()
                  );
                }
              })()
            );
          })(),
          React.createElement("div", { className: "outlined--light outlined--top push-double-ends" }),
          React.createElement(
            "p",
            null,
            "Thank you so much for your gift! It is because of your generosity we are able to continue telling stories of the greatness of Jesus and seeing peoples lives changed."
          ),
          React.createElement(
            "h3",
            null,
            "Read Some Recent Stories"
          ),
          React.createElement(
            "div",
            { className: "grid" },
            React.createElement(
              "div",
              { className: "grid__item one-whole one-half@anchored push-bottom" },
              React.createElement(
                _coreClientComponents.Card,
                {
                  link: "https://newspring.cc/stories/jen-feagles",
                  image: {
                    url: "//dg0ddngxdz549.cloudfront.net/images/cached/images/remote/http_s3.amazonaws.com/ns.images/newspring/collection/stories/JenFeagles.hero_1700_723_90_c1.jpg"
                  }
                },
                React.createElement(
                  "h4",
                  null,
                  "Jennifer Feagles Story"
                ),
                React.createElement(
                  "p",
                  null,
                  "Jennifer Feagles shares about how Jesus gave her more than she could have imagined when she put him first in her…"
                ),
                React.createElement(
                  _reactRouter.Link,
                  {
                    to: "https://newspring.cc/stories/jen-feagles",
                    className: "h6 btn--small btn--dark-tertiary soft-sides@portable"
                  },
                  "Watch Story"
                )
              )
            ),
            React.createElement(
              "div",
              { className: "grid__item one-whole one-half@anchored push-bottom" },
              React.createElement(
                _coreClientComponents.Card,
                {
                  link: "https://newspring.cc/stories/brooke-brissey",
                  image: {
                    url: "//dg0ddngxdz549.cloudfront.net/images/cached/images/remote/http_s3.amazonaws.com/ns.images/newspring/collection/stories/BrookeBrissey_Hero_1700_723_90_c1.jpg"
                  }
                },
                React.createElement(
                  "h4",
                  null,
                  "Brooke Brissey's Story"
                ),
                React.createElement(
                  "p",
                  null,
                  "Brooke Brissey discovered the power of a financial plan to obey God's call on her life. This is her story in her own…                  "
                ),
                React.createElement(
                  _reactRouter.Link,
                  {
                    to: "https://newspring.cc/stories/brooke-brissey",
                    className: "h6 btn--small btn--dark-tertiary soft-sides@portable"
                  },
                  "Read Story"
                )
              )
            )
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