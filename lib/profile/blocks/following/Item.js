"use strict";

exports.__esModule = true;
exports["default"] = undefined;

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _class, _temp;

var _react = require("react");

var _controls = require("../../../core/components/controls");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var FollowingItem = (_temp = _class = function (_Component) {
  (0, _inherits3["default"])(FollowingItem, _Component);

  function FollowingItem() {
    (0, _classCallCheck3["default"])(this, FollowingItem);
    return (0, _possibleConstructorReturn3["default"])(this, _Component.apply(this, arguments));
  }

  FollowingItem.prototype.render = function render() {

    return React.createElement(
      "div",
      { className: "push-left soft-ends soft-right text-left floating outlined--light outlined--bottom" },
      React.createElement(
        "h6",
        { className: "soft-half-left three-quarters flush floating__item" },
        this.props.item
      ),
      React.createElement(_controls.Switch, {
        id: this.props.switchId,
        containerClasses: "one-quarter floating__item",
        containerStyle: { marginTop: "-12px" },
        changed: this.props.changed,
        active: this.props.active
      })
    );
  };

  return FollowingItem;
}(_react.Component), _class.propTypes = {
  item: _react.PropTypes.string.isRequired,
  changed: _react.PropTypes.func.isRequired,
  switchId: _react.PropTypes.number.isRequired,
  active: _react.PropTypes.bool.isRequired
}, _temp);
exports["default"] = FollowingItem;
module.exports = exports['default'];