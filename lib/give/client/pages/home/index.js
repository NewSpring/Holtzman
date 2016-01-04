"use strict";

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require("react");

var _reactRedux = require("react-redux");

var _reactMixin = require("react-mixin");

var _reactMixin2 = _interopRequireDefault(_reactMixin);

var _reactRouter = require("react-router");

var _rockLibApi = require("../../../../rock/lib/api");

var _coreClientLayoutsSplit = require("../../../../core/client/layouts/split");

var _coreClientComponents = require("../../../../core/client/components");

var _coreClientComponentsLoading = require("../../../../core/client/components/loading");

var _libCollections = require("../../../lib/collections");

var _blocks = require("../../blocks");

var Home = (function (_Component) {
  _inherits(Home, _Component);

  function Home() {
    _classCallCheck(this, _Home);

    _Component.apply(this, arguments);
  }

  Home.prototype.getMeteorData = function getMeteorData() {
    var accounts = undefined;
    var paymentDetails = undefined;

    if (Meteor.isClient) {
      Meteor.subscribe("accounts");
      accounts = _libCollections.Accounts.find().fetch();
    }

    if (Meteor.isServer) {
      accounts = _rockLibApi.api.get.sync(_rockLibApi.endpoints.accounts);
    }

    return {
      accounts: accounts
    };
  };

  Home.prototype.render = function render() {
    var _this = this;

    return React.createElement(
      _coreClientLayoutsSplit.Split,
      { nav: true },
      React.createElement(_coreClientLayoutsSplit.Right, {
        background: "//dg0ddngxdz549.cloudfront.net/images/cached/images/remote/http_s3.amazonaws.com/ns.images/newspring/give/giveyourbrainabreak2_1000_1000_90.jpg" }),
      React.createElement(
        _coreClientLayoutsSplit.Left,
        { scroll: true },
        React.createElement(
          "div",
          { className: "soft soft-double@lap-and-up push-double@lap-wide-and-up" },
          React.createElement(
            "div",
            { className: "text-left" },
            React.createElement(_blocks.AddToCart, {
              accounts: this.data.accounts
            })
          ),
          React.createElement(
            "div",
            { className: "soft-double-ends@lap-and-up" },
            React.createElement("div", { className: "outlined--light outlined--top push-double-ends" })
          ),
          React.createElement(
            "h4",
            { className: "push-bottom@lap-and-up" },
            "Or, give to one of our campaigns..."
          ),
          React.createElement(
            "div",
            { className: "grid" },
            (function () {
              if (!_this.data.accounts.length) {
                return React.createElement(
                  "div",
                  { className: "one-whole text-center soft-ends" },
                  React.createElement(_coreClientComponentsLoading.Spinner, { styles: { width: "40px", height: "40px" } })
                );
              }
            })(),
            this.data.accounts.map(function (account, i) {
              if (!account.Url || !account.Description) {
                return null;
              }

              return React.createElement(
                "div",
                { key: i, className: "grid__item one-whole one-half@anchored push-bottom" },
                React.createElement(
                  _coreClientComponents.Card,
                  {
                    link: "/give/campaign/" + encodeURI(account.Name),
                    image: {
                      url: account.Url
                    }
                  },
                  React.createElement(
                    "h4",
                    null,
                    account.PublicName || account.Name
                  ),
                  React.createElement(
                    "p",
                    null,
                    account.Description
                  ),
                  React.createElement(
                    _reactRouter.Link,
                    {
                      to: "/give/campaign/" + encodeURI(account.Name),
                      className: "h6 btn--small btn--dark-tertiary soft-sides@portable"
                    },
                    "Learn more"
                  )
                )
              );
            })
          )
        )
      )
    );
  };

  var _Home = Home;
  Home = _reactMixin2["default"].decorate(ReactMeteorData)(Home) || Home;
  Home = _reactRedux.connect()(Home) || Home;
  return Home;
})(_react.Component);

exports["default"] = Home;
module.exports = exports["default"];