"use strict";

exports.__esModule = true;
exports["default"] = undefined;

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _dec, _class;

var _react = require("react");

var _reactRedux = require("react-redux");

var _reactMixin = require("react-mixin");

var _reactMixin2 = _interopRequireDefault(_reactMixin);

var _store = require("../../store");

var _routing = require("../../store/routing");

var _accounts = require("../accounts");

var _accounts2 = _interopRequireDefault(_accounts);

var _collections = require("../../collections");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var map = function map(state) {
  return { auth: state.accounts.authorized, modal: state.modal };
};
var Authorized = (_dec = (0, _reactRedux.connect)(map), _dec(_class = function (_Component) {
  (0, _inherits3["default"])(Authorized, _Component);

  function Authorized() {
    (0, _classCallCheck3["default"])(this, Authorized);
    return (0, _possibleConstructorReturn3["default"])(this, _Component.apply(this, arguments));
  }

  Authorized.prototype.componentWillMount = function componentWillMount() {
    var authorized = Meteor.userId();
    if (!authorized) {
      this.props.dispatch(_store.modal.render(_accounts2["default"]));
    }

    // fail safe if for some reason we are logged in but not authorized in
    // the application
    if (authorized && !this.props.auth) {
      this.props.dispatch(_store.accounts.authorize(true));
    }
  };

  Authorized.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {

    if (this.props.modal.visible && !nextProps.modal.visible && !nextProps.auth) {
      this.props.dispatch(_routing.routeActions.push("/"));
    }

    if (this.props.auth && !nextProps.auth) {
      this.props.dispatch(_store.modal.render(_accounts2["default"]));
    }

    // if (!this.props.auth && nextProps.auth) {
    //   this.props.dispatch(modal.hide())
    // }
  };

  Authorized.prototype.render = function render() {
    if (Meteor.userId()) {
      return this.props.children;
    }

    /*
       This is a temporary work around to a bug with webkit on iOS
      If there is not relative DOM behind a fixed DOM container with inputs
      inside of it, the inputs will not show a focused state, or show as you type
       I'm not sure of a good solution yet, hence the hackery
     */
    if (Meteor.isCordova) {
      return React.createElement(
        "section",
        { className: "push-double-ends" },
        React.createElement(
          "section",
          { className: "push-double-ends" },
          React.createElement(
            "section",
            { className: "push-double-ends" },
            React.createElement(
              "section",
              { className: "push-double-ends" },
              React.createElement(
                "section",
                { className: "push-double-ends" },
                React.createElement("section", { className: "push-double-ends" })
              )
            )
          )
        )
      );
    }
    return null;
  };

  return Authorized;
}(_react.Component)) || _class);
exports["default"] = Authorized;
module.exports = exports['default'];