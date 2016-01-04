"use strict";

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _componentsLabel = require("./components/label");

var _componentsLabel2 = _interopRequireDefault(_componentsLabel);

var Checkbox = (function (_React$Component) {
  _inherits(Checkbox, _React$Component);

  function Checkbox() {
    var _this = this;

    _classCallCheck(this, Checkbox);

    _React$Component.apply(this, arguments);

    this.state = {
      status: false,
      error: false
    };

    this.validate = function (event) {
      var value = event.target.value;

      if (!value) {
        _this.setState({
          active: false,
          error: false
        });
      }

      if (_this.props.validation && typeof _this.props.validation === "function") {
        _this.setState({
          error: !_this.props.validation(value)
        });
      }
    };

    this.setStatus = function (message) {
      _this.props.status = message;
    };

    this.disabled = function () {
      if (_this.props.disabled) {
        return disabled;
      }
    };
  }

  Checkbox.prototype.renderHelpText = function renderHelpText(message) {

    if (this.state.error && this.props.errorText || this.state.status) {

      return _react2["default"].createElement(
        "span",
        { className: "input__status" },
        this.props.errorText || this.state.status
      );
    }
  };

  Checkbox.prototype.render = function render() {
    var _this2 = this;

    var inputclasses = ["input"];

    // theme overwrite
    if (this.props.theme) {
      inputclasses = this.props.theme;
    }
    // state mangaged classes
    if (this.state.status) {
      inputclasses.push("push-double-bottom");
    }

    if (this.props.type) {
      inputclasses.push(this.props.type);
    } else {
      inputclasses.push("checkbox");
    }

    if (this.props.error) {
      inputclasses.push("input--alert");
    }
    // custom added classes
    if (this.props.classes) {
      inputclasses = inputclasses.concat(this.props.classes);
    }

    return _react2["default"].createElement(
      "div",
      { className: inputclasses.join(" ") },
      _react2["default"].createElement("input", {
        ref: this.props.id || this.props.label || this.props.name,
        id: this.props.id || this.props.label || this.props.name,
        type: this.props.type || "checkbox",
        name: this.props.name || this.props.label,
        className: this.props.inputClasses,
        disabled: this.disabled(),
        defaultChecked: this.props.defaultValue ? "checked" : "",
        onClick: this.props.clicked,
        style: { width: 0 }
      }),
      (function () {
        if (!_this2.props.hideLabel) {
          return _react2["default"].createElement(_componentsLabel2["default"], {
            labelFor: _this2.props.id || _this2.props.label || _this2.props.name
          });
        }
      })(),
      _react2["default"].createElement(
        "h6",
        { className: "soft-double-left flush-bottom text-left float-left locked-top" },
        _react2["default"].createElement(
          "small",
          null,
          this.props.children
        )
      ),
      this.renderHelpText()
    );
  };

  return Checkbox;
})(_react2["default"].Component);

exports["default"] = Checkbox;
module.exports = exports["default"];