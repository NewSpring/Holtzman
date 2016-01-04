"use strict";

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require("react");

var _reactRedux = require("react-redux");

var _reactMixin = require("react-mixin");

var _reactMixin2 = _interopRequireDefault(_reactMixin);

var _actions = require("../../actions");

var _onBoard = require("../on-board");

var _onBoard2 = _interopRequireDefault(_onBoard);

var _rockLibCollections = require("../../../../rock/lib/collections");

var map = function map(state) {
  return { auth: state.onBoard.authorized };
};

var bindMeteorPerson = function bindMeteorPerson(props) {
  var dispatch = props.dispatch;
  var auth = props.auth;

  var handle = {};
  var authorized = false;
  Tracker.autorun(function (computation) {
    handle = computation;

    var user = Meteor.user();
    Meteor.subscribe("people");
    dispatch(_actions.onBoard.person(_rockLibCollections.People.find().fetch()[0]));

    if (user) {
      authorized = true;
    } else {
      authorized = false;
      dispatch(_actions.onBoard.signout());
    }
  });

  return { handle: handle, authorized: authorized };
};

var Authorized = (function (_Component) {
  _inherits(Authorized, _Component);

  function Authorized() {
    _classCallCheck(this, _Authorized);

    _Component.apply(this, arguments);
  }

  Authorized.prototype.componentWillMount = function componentWillMount() {
    var _bindMeteorPerson = bindMeteorPerson(this.props);

    var handle = _bindMeteorPerson.handle;
    var authorized = _bindMeteorPerson.authorized;

    this.handle = handle;

    if (!authorized) {
      this.props.dispatch(_actions.modal.render(_onBoard2["default"]));
    }
  };

  Authorized.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    if (!nextProps.auth) {
      this.props.dispatch(_actions.modal.render(_onBoard2["default"]));
    }

    if (!this.props.auth && nextProps.auth) {
      this.props.dispatch(_actions.modal.hide());
    }
  };

  Authorized.prototype.componentWillUnmount = function componentWillUnmount() {
    this.handle.stop();
  };

  Authorized.prototype.render = function render() {
    return this.props.children;
  };

  var _Authorized = Authorized;
  Authorized = _reactRedux.connect(map)(Authorized) || Authorized;
  return Authorized;
})(_react.Component);

exports["default"] = Authorized;
module.exports = exports["default"];