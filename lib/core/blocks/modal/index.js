"use strict";

exports.__esModule = true;
exports["default"] = undefined;

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _dec, _class;

var _react = require("react");

var _reactRedux = require("react-redux");

var _reactMotion = require("react-motion");

var _store = require("../../store");

var _Modal = require("./Modal");

var _Modal2 = _interopRequireDefault(_Modal);

var _offset = {
  "offset": "offset__offset___qWQMs"
};

var _offset2 = _interopRequireDefault(_offset);

var _modal = {
  "side-panel": "modal__side-panel___1p2mN",
  "interior": "modal__interior___2ZAso"
};

var _modal2 = _interopRequireDefault(_modal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var map = function map(state) {
  return {
    navigation: state.nav,
    modal: state.modal,
    path: state.routing.path
  };
};

var SideModalContainer = (_dec = (0, _reactRedux.connect)(map), _dec(_class = function (_Component) {
  (0, _inherits3["default"])(SideModalContainer, _Component);

  function SideModalContainer() {
    var _temp, _this, _ret;

    (0, _classCallCheck3["default"])(this, SideModalContainer);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3["default"])(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.state = {
      previous: null
    }, _this.bindEsc = function (event) {
      // if key hit is `esc` or template is closed is clicked
      if (event.keyCode === 27) {
        _this.props.dispatch(_store.modal.hide());
      }
    }, _this.close = function (e) {
      var target = e.target;
      var id = target.id;

      if (id != "@@modal") {
        return;
      }

      _this.props.dispatch(_store.modal.hide());
    }, _temp), (0, _possibleConstructorReturn3["default"])(_this, _ret);
  }

  SideModalContainer.prototype.componentDidMount = function componentDidMount() {
    if (!this.props.modal.props.keepNav && this.props.modal.visible) {
      this.props.dispatch(_store.nav.setLevel("MODAL"));
    }

    if (Meteor.isClient) {
      document.addEventListener("keyup", this.bindEsc, false);
    }
  };

  SideModalContainer.prototype.componentWillUnmount = function componentWillUnmount() {
    if (Meteor.isClient) {
      document.removeEventListener("keyup", this.bindEsc, false);
    }
  };

  SideModalContainer.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    if (nextProps.modal.visible && nextProps.navigation.level != "MODAL" && nextProps.modal.props.keepNav != true) {
      this.props.dispatch(_store.nav.setLevel("MODAL"));
      this.setState({ previous: this.props.navigation.level });
    }

    if (!nextProps.modal.visible && nextProps.navigation.level === "MODAL" && !this.props.modal.props.keepNav) {
      var previous = this.state.previous;
      if (previous === "MODAL" || !previous) {
        previous = "TOP";
      }
      this.props.dispatch(_store.nav.setLevel(previous));
    }

    if (!nextProps.modal.visible && this.props.path != nextProps.path) {
      this.props.dispatch(_store.modal.hide());
    }
  };

  SideModalContainer.prototype.componentWillUpdate = function componentWillUpdate(nextProps) {
    if (typeof document != "undefined" && document != null) {
      var root = document.documentElement;

      if (!nextProps.modal.visible) {
        root.className = root.className.split(" ").filter(function (className) {
          return className != "modal--opened";
        }).join(" ");
      } else if (!this.props.modal.visible && nextProps.modal.visible) {
        root.className += " modal--opened";
      }
    }
  };

  SideModalContainer.prototype.render = function render() {

    var enter = "fadeIn";
    var exit = "fadeOut";

    var _props$modal = this.props.modal;
    var visible = _props$modal.visible;
    var content = _props$modal.content;
    var props = _props$modal.props;

    return React.createElement(_Modal2["default"], (0, _extends3["default"])({
      close: this.close,
      component: content,
      props: props,
      visible: visible
    }, this.props));
  };

  return SideModalContainer;
}(_react.Component)) || _class);
exports["default"] = SideModalContainer;
module.exports = exports['default'];