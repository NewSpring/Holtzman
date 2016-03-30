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

var _switch = {
  "toggle-switch": "switch__toggle-switch___Lrw_T"
};

var _switch2 = _interopRequireDefault(_switch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Switch = (_temp2 = _class = function (_Component) {
  (0, _inherits3["default"])(Switch, _Component);

  function Switch() {
    var _temp, _this, _ret;

    (0, _classCallCheck3["default"])(this, Switch);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3["default"])(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.layoutClasses = function () {
      var classes = [_switch2["default"]["toggle-switch"]];

      if (_this.props.classes) {
        classes = classes.concat(_this.props.classes);
      }

      return classes.join(" ");
    }, _this.changed = function () {
      _this.props.changed(_this.props.id);
    }, _temp), (0, _possibleConstructorReturn3["default"])(_this, _ret);
  }

  Switch.prototype.render = function render() {

    var switchId = "switch-" + this.props.id;

    return React.createElement(
      "div",
      { className: this.props.containerClasses, style: this.props.containerStyle },
      React.createElement("input", {
        className: this.props.theme || this.layoutClasses(),
        styles: this.props.styles || {},
        type: "checkbox",
        name: this.props.name || switchId || "toggle-switch",
        id: switchId,
        onChange: this.changed,
        checked: this.props.active
      }),
      React.createElement("label", { htmlFor: switchId, className: "float-right" })
    );
  };

  return Switch;
}(_react.Component), _class.propTypes = {
  id: _react.PropTypes.number.isRequired,
  changed: _react.PropTypes.func.isRequired
}, _temp2);
exports["default"] = Switch;
module.exports = exports['default'];