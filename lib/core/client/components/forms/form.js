"use strict";

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _fieldset = require("./fieldset");

var _fieldset2 = _interopRequireDefault(_fieldset);

var Form = (function (_React$Component) {
  _inherits(Form, _React$Component);

  function Form() {
    var _this = this;

    _classCallCheck(this, Form);

    _React$Component.apply(this, arguments);

    this.layoutClasses = function () {
      var classes = ["hard-ends"];

      if (_this.props.classes) {
        classes = classes.concat(_this.props.classes);
      }

      return classes.join(" ");
    };
  }

  Form.prototype.render = function render() {

    return _react2["default"].createElement(
      "form",
      {
        id: this.props.id,
        onSubmit: this.props.submit,
        className: this.props.theme || this.layoutClasses(),
        action: this.props.action,
        method: this.props.method,
        style: this.props.style
      },
      _react2["default"].createElement(
        _fieldset2["default"],
        {
          theme: this.props.fieldsetTheme
        },
        this.props.children
      )
    );
  };

  return Form;
})(_react2["default"].Component);

exports["default"] = Form;
module.exports = exports["default"];