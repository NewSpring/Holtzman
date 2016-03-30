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

var _Label = require("./components/Label");

var _Label2 = _interopRequireDefault(_Label);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Checkbox = function (_React$Component) {
  (0, _inherits3["default"])(Checkbox, _React$Component);

  function Checkbox() {
    var _temp, _this, _ret;

    (0, _classCallCheck3["default"])(this, Checkbox);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3["default"])(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.state = {
      status: false,
      error: false
    }, _this.validate = function (event) {
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
    }, _this.setStatus = function (message) {
      _this.props.status = message;
    }, _this.disabled = function () {
      if (_this.props.disabled) {
        return disabled;
      }
    }, _temp), (0, _possibleConstructorReturn3["default"])(_this, _ret);
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
      _react2["default"].createElement(
        "h6",
        { className: "soft-left push-half-left flush-bottom text-left float-left locked-top" },
        _react2["default"].createElement(
          "small",
          null,
          this.props.children
        )
      ),
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
      function () {
        if (!_this2.props.hideLabel) {
          return _react2["default"].createElement(_Label2["default"], {
            labelFor: _this2.props.id || _this2.props.label || _this2.props.name
          });
        }
      }(),
      this.renderHelpText()
    );
  };

  return Checkbox;
}(_react2["default"].Component);

exports["default"] = Checkbox;
module.exports = exports['default'];