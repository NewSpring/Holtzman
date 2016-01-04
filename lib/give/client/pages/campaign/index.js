"use strict";

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require("react");

var _reactRouter = require("react-router");

var _reactRedux = require("react-redux");

var _reactMixin = require("react-mixin");

var _reactMixin2 = _interopRequireDefault(_reactMixin);

// loading state

var _coreClientComponents = require("../../../../core/client/components");

var _coreClientActions = require("../../../../core/client/actions");

var _coreClientLayoutsSplit = require("../../../../core/client/layouts/split");

var _libCollections = require("../../../lib/collections");

var _blocks = require("../../blocks");

var Template = (function (_Component) {
  _inherits(Template, _Component);

  function Template() {
    _classCallCheck(this, _Template);

    _Component.apply(this, arguments);
  }

  Template.prototype.componentWillMount = function componentWillMount() {
    this.props.dispatch(_coreClientActions.nav.setLevel("CONTENT"));
  };

  Template.prototype.componentWillUnmount = function componentWillUnmount() {
    this.props.dispatch(_coreClientActions.nav.setLevel("TOP"));
  };

  Template.prototype.getMeteorData = function getMeteorData() {
    Meteor.subscribe("accounts");
    var Name = decodeURI(this.props.params.name);
    var account = _libCollections.Accounts.findOne({ Name: Name });

    return {
      account: account
    };
  };

  Template.prototype.render = function render() {
    var account = this.data.account;

    if (!account) {
      // loading
      return React.createElement(_coreClientComponents.Loading, null);
    }

    return React.createElement(
      _coreClientLayoutsSplit.Split,
      { nav: true },
      React.createElement(_coreClientLayoutsSplit.Right, { background: account.Url, mobile: true }),
      React.createElement(
        _coreClientLayoutsSplit.Left,
        { scroll: true },
        React.createElement(
          "div",
          { className: "constrain-copy soft-double@lap-and-up" },
          React.createElement(
            "div",
            { className: "soft soft-double-bottom soft-double-top@lap-and-up" },
            React.createElement(
              "h2",
              null,
              account.PublicName
            ),
            React.createElement("div", { dangerouslySetInnerHTML: { __html: account.PublicDescription } })
          )
        ),
        React.createElement(
          "div",
          { className: "background--light-secondary" },
          React.createElement(
            "div",
            { className: "constrain-copy soft-double@lap-and-up" },
            React.createElement(
              "div",
              { className: "soft soft-double-bottom soft-double-top@lap-and-up" },
              React.createElement(_blocks.AddToCart, {
                accounts: [account]
              })
            )
          )
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

var Routes = [{ path: "campaign/:name", component: Template }];

exports["default"] = {
  Template: Template,
  Routes: Routes
};
module.exports = exports["default"];