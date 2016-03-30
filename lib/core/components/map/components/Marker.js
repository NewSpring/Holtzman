"use strict";

exports.__esModule = true;
exports["default"] = undefined;

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _class, _temp2;

var _react = require("react");

var _function = require("react-pure-render/function");

var _function2 = _interopRequireDefault(_function);

var _styles = require("./styles");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Marker = (_temp2 = _class = function (_Component) {
  (0, _inherits3["default"])(Marker, _Component);

  function Marker() {
    var _temp, _this, _ret;

    (0, _classCallCheck3["default"])(this, Marker);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3["default"])(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.shouldComponentUpdate = _function2["default"], _temp), (0, _possibleConstructorReturn3["default"])(_this, _ret);
  }

  Marker.prototype.render = function render() {
    var style = this.props.$hover || this.props.hover ? _styles.hover : _styles.base;

    if (this.props.active) {
      style = _styles.active;
    }

    return React.createElement(
      "div",
      { style: style },
      this.props.children
    );
  };

  return Marker;
}(_react.Component), _class.propTypes = {
  // GoogleMap pass $hover props to hovered components
  // to detect hover it uses internal mechanism, explained in x_distance_hover example
  $hover: _react.PropTypes.bool,
  text: _react.PropTypes.string
}, _class.defaultProps = {}, _temp2);
exports["default"] = Marker;
module.exports = exports['default'];