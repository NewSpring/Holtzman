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

var _class, _temp2;

var _react = require("react");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Left = (_temp2 = _class = function (_Component) {
  (0, _inherits3["default"])(Left, _Component);

  function Left() {
    var _temp, _this, _ret;

    (0, _classCallCheck3["default"])(this, Left);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3["default"])(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.layoutClasses = function () {
      var classes = [
      // "panel__item--left",
      "relative", "hard", "flush"];

      if (_this.props.scroll) {
        classes.push("scrollable");
      }

      if (_this.props.width) {
        classes.push(_this.props.width);
      } else {
        classes.push("seven-twelfths@lap-and-up");
      }

      if (_this.props.background) {
        classes.push("background--fill");
      }

      if (_this.props.classes) {
        classes = classes.concat(_this.props.classes);
      }

      return classes.join(" ");
    }, _this.styles = function () {
      var defaults = {
        // position: "relative"
      };
      if (_this.props.background) {
        return (0, _extends3["default"])({}, defaults, {
          backgroundImage: "url($this.props.image)"
        });
      }

      return defaults;
    }, _temp), (0, _possibleConstructorReturn3["default"])(_this, _ret);
  }

  Left.prototype.render = function render() {
    return React.createElement(
      "section",
      {
        className: this.props.theme || this.layoutClasses(),
        style: this.props.styles || this.styles()
      },
      this.props.children
    );
  };

  return Left;
}(_react.Component), _class.propTypes = {
  classes: _react.PropTypes.array,
  theme: _react.PropTypes.string,
  scroll: _react.PropTypes.bool,
  width: _react.PropTypes.string,
  background: _react.PropTypes.string,
  styles: _react.PropTypes.object
}, _temp2);
exports["default"] = Left;
module.exports = exports['default'];