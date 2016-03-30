"use strict";

exports.__esModule = true;
exports["default"] = undefined;

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _Link = require("./Link");

var _Link2 = _interopRequireDefault(_Link);

var _nav = {
  "nav-bar": "nav__nav-bar___vz8uD",
  "locked": "nav__locked___FoUqI"
};

var _nav2 = _interopRequireDefault(_nav);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var NavLayout = function (_React$Component) {
  (0, _inherits3["default"])(NavLayout, _React$Component);

  function NavLayout() {
    var _temp, _this, _ret;

    (0, _classCallCheck3["default"])(this, NavLayout);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3["default"])(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.layoutClasses = function () {
      var classes = [
      // "background--dark-primary",
      "one-whole", "floating", "soft-half", "locked-left", "locked-bottom", "hard-sides@lap-and-up", "soft-half-top@lap-and-up"];

      if (_this.props.classes) {
        classes.concat(_this.props.classes);
      } else {
        classes.push(_nav2["default"]["nav-bar"]);
      }

      return classes.join(" ");
    }, _this.isLiked = function () {
      if (typeof window != "undefined" && window != null) {
        var urlParts = window.location.pathname.split("/");
        var entryId = urlParts[urlParts.length - 1];
        return _.contains(_this.props.liked.likes, String(entryId));
      }

      return false;
    }, _temp), (0, _possibleConstructorReturn3["default"])(_this, _ret);
  }

  NavLayout.prototype.render = function render() {
    var _this2 = this;

    var _props = this.props;
    var handleAction = _props.handleAction;
    var back = _props.back;
    var reset = _props.reset;

    return _react2["default"].createElement(
      "section",
      { className: this.props.theme || this.layoutClasses(), style: { backgroundColor: "#202020" } },
      this.props.links.map(function (item, i) {
        return _react2["default"].createElement(_Link2["default"], {
          navItem: item,
          key: i,
          handleAction: handleAction,
          reset: reset,
          modal: _this2.props.modal,
          liked: _this2.isLiked()
        });
      })
    );
  };

  return NavLayout;
}(_react2["default"].Component);

exports["default"] = NavLayout;
module.exports = exports['default'];