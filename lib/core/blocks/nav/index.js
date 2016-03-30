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

var _store = require("../../store");

var _Layout = require("./Layout");

var _Layout2 = _interopRequireDefault(_Layout);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// We only care about the navigation state
var map = function map(state) {
  return {
    state: state.nav,
    modal: state.modal,
    liked: state.liked
    // router: state.routing
  };
};

var NavContainer = (_dec = (0, _reactRedux.connect)(map), _dec(_class = function (_Component) {
  (0, _inherits3["default"])(NavContainer, _Component);

  function NavContainer() {
    var _temp, _this, _ret;

    (0, _classCallCheck3["default"])(this, NavContainer);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3["default"])(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.handleAction = function (action) {
      _this.props.dispatch(action(_this.props));
    }, _this.reset = function () {
      // always hide modal on change
      _this.props.dispatch(_store.modal.hide());
    }, _temp), (0, _possibleConstructorReturn3["default"])(_this, _ret);
  }

  NavContainer.prototype.render = function render() {
    var state = this.props.state;

    if (!state.visible) {
      return null;
    }

    return React.createElement(_Layout2["default"], {
      links: state.links,
      handleAction: this.handleAction,
      back: this.getBackLink,
      reset: this.reset,
      modal: this.props.modal,
      liked: this.props.liked,
      key: "navigation"
    });
  };

  return NavContainer;
}(_react.Component)) || _class);
exports["default"] = NavContainer;
module.exports = exports['default'];