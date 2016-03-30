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

var _Fieldset = require("./Fieldset");

var _Fieldset2 = _interopRequireDefault(_Fieldset);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Form = function (_Component) {
  (0, _inherits3["default"])(Form, _Component);

  function Form() {
    var _temp, _this, _ret;

    (0, _classCallCheck3["default"])(this, Form);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3["default"])(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.layoutClasses = function () {
      var classes = ["hard-ends"];

      if (_this.props.classes) {
        classes = classes.concat(_this.props.classes);
      }

      return classes.join(" ");
    }, _temp), (0, _possibleConstructorReturn3["default"])(_this, _ret);
  }

  Form.prototype.render = function render() {

    return React.createElement(
      "form",
      {
        id: this.props.id,
        onSubmit: this.props.submit,
        className: this.props.theme || this.layoutClasses(),
        action: this.props.action,
        method: this.props.method,
        style: this.props.style
      },
      React.createElement(
        _Fieldset2["default"],
        {
          theme: this.props.fieldsetTheme
        },
        this.props.children
      )
    );
  };

  return Form;
}(_react.Component);

exports["default"] = Form;
module.exports = exports['default'];