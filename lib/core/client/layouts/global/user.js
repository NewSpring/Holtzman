"use strict";

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require("react");

var _reactMixin = require("react-mixin");

var _reactMixin2 = _interopRequireDefault(_reactMixin);

var _reactRedux = require("react-redux");

var _global = require("./global");

var _global2 = _interopRequireDefault(_global);

var _libStore = require("../../../lib/store");

var _actions = require("../../actions");

var _rockClientMiddlewares = require("../../../../rock/client/middlewares");

var _middlewares = require("../../middlewares");

_middlewares.addMiddleware(_rockClientMiddlewares.onBoard);

var Layout = (function (_Component) {
  _inherits(Layout, _Component);

  function Layout() {
    var _this = this;

    _classCallCheck(this, _Layout);

    _Component.apply(this, arguments);

    this.setLoggedIn = function (user) {
      _this.props.dispatch(_actions.onBoard.authorize(user != null));
    };
  }

  Layout.prototype.getMeteorData = function getMeteorData() {

    var user = Meteor.user();

    if (user && this.data.user && user._id != this.data.user._id || !this.data.user) {
      Meteor.subscribe("people");
      this.setLoggedIn(user);
    } else if (!user) {
      this.setLoggedIn(null);
    }

    return {
      user: user
    };
  };

  Layout.prototype.render = function render() {
    return this.props.children;
  };

  var _Layout = Layout;
  Layout = _reactMixin2["default"].decorate(ReactMeteorData)(Layout) || Layout;
  Layout = _reactRedux.connect()(Layout) || Layout;
  return Layout;
})(_react.Component);

var App = (function (_Component2) {
  _inherits(App, _Component2);

  function App() {
    _classCallCheck(this, App);

    _Component2.apply(this, arguments);
  }

  App.prototype.render = function render() {
    return React.createElement(
      _global2["default"],
      null,
      React.createElement(
        Layout,
        null,
        this.props.children
      )
    );
  };

  return App;
})(_react.Component);

exports["default"] = App;
module.exports = exports["default"];