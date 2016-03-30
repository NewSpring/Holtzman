"use strict";

exports.__esModule = true;
exports["default"] = exports.Left = exports.Right = undefined;

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _dec, _class, _class2, _temp2;

var _react = require("react");

var _reactRedux = require("react-redux");

var _offset = {
  "offset": "offset__offset___qWQMs"
};

var _offset2 = _interopRequireDefault(_offset);

var _Right = require("./Right");

var _Right2 = _interopRequireDefault(_Right);

var _Left = require("./Left");

var _Left2 = _interopRequireDefault(_Left);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

exports.Right = _Right2["default"];
exports.Left = _Left2["default"];


var map = function map(state) {
  return { navigation: state.nav };
};

var SplitContainer = (_dec = (0, _reactRedux.connect)(map), _dec(_class = (_temp2 = _class2 = function (_Component) {
  (0, _inherits3["default"])(SplitContainer, _Component);

  function SplitContainer() {
    var _temp, _this, _ret;

    (0, _classCallCheck3["default"])(this, SplitContainer);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3["default"])(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.layoutClasses = function () {
      var classes = ["panel", "fixed@lap-and-up"];

      if (_this.props.classes) {
        classes = classes.concat(_this.props.classes);
      }

      if (_this.props.navigation.visible && _this.props.nav) {
        classes.push(_offset2["default"]["offset"]);
      }

      return classes.join(" ");
    }, _temp), (0, _possibleConstructorReturn3["default"])(_this, _ret);
  }

  SplitContainer.prototype.render = function render() {
    return React.createElement(
      "div",
      {
        className: this.props.theme || this.layoutClasses(),
        style: this.props.styles
      },
      this.props.children
    );
  };

  return SplitContainer;
}(_react.Component), _class2.propTypes = {
  classes: _react.PropTypes.array,
  theme: _react.PropTypes.string,
  styles: _react.PropTypes.object,
  nav: _react.PropTypes.bool
}, _class2.defaultProps = {
  styles: {}
}, _temp2)) || _class);
exports["default"] = SplitContainer;