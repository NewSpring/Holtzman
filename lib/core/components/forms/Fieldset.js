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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var FieldSet = function (_React$Component) {
  (0, _inherits3["default"])(FieldSet, _React$Component);

  function FieldSet() {
    var _temp, _this, _ret;

    (0, _classCallCheck3["default"])(this, FieldSet);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3["default"])(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.layoutClasses = function () {
      var classes = ["flush-bottom"];

      if (_this.props.classes) {
        classes = classes.concat(_this.props.classes);
      }

      return classes.join(" ");
    }, _temp), (0, _possibleConstructorReturn3["default"])(_this, _ret);
  }

  FieldSet.prototype.render = function render() {
    return _react2["default"].createElement(
      "fieldset",
      { className: this.props.theme || this.layoutClasses() },
      this.props.children
    );
  };

  return FieldSet;
}(_react2["default"].Component);

exports["default"] = FieldSet;
module.exports = exports['default'];