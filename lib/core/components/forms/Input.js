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

var _react = require("react");

var _reactDom = require("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _Label = require("./components/Label");

var _Label2 = _interopRequireDefault(_Label);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Input = function (_Component) {
  (0, _inherits3["default"])(Input, _Component);

  function Input() {
    var _temp, _this, _ret;

    (0, _classCallCheck3["default"])(this, Input);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3["default"])(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.state = {
      active: false,
      focused: false,
      error: false,
      status: "",
      value: null
    }, _this.format = function (e) {

      var target = ReactDOM.findDOMNode(_this.refs["apollos-input"]);
      var value = _this.refs["apollos-input"].value;

      if (_this.props.format && typeof _this.props.format === "function") {

        var newValue = _this.props.format(value, target, e);
        target.value = newValue;
      }

      if (_this.props.onChange && typeof _this.props.onChange === "function") {
        _this.props.onChange(target.value, target, e);
      }
    }, _this.validate = function (e) {

      var target = ReactDOM.findDOMNode(_this.refs["apollos-input"]);
      var value = target.value;

      if (!value) {
        _this.setState({
          active: false,
          error: false
        });
      }

      _this.setState({
        focused: false
      });

      if (_this.props.validation && typeof _this.props.validation === "function") {
        _this.setState({
          error: !_this.props.validation(value, target, e)
        });
      }

      if (_this.props.onBlur && typeof _this.props.onBlur === "function") {
        _this.props.onBlur(value, target, e);
      }
    }, _this.focus = function (event) {
      _this.setState({
        active: true,
        error: false,
        focused: true
      });
    }, _this.setValue = function (value) {
      var node = ReactDOM.findDOMNode(_this.refs["apollos-input"]);
      node.value = value;
      _this.focus();
      _this.validate();
    }, _this.getValue = function () {
      return ReactDOM.findDOMNode(_this.refs["apollos-input"]).value;
    }, _this.setStatus = function (message) {
      _this.props.status = message;
    }, _this.disabled = function () {
      if (_this.props.disabled) {
        return _this.props.disabled;
      }
    }, _this.renderHelpText = function (message) {

      if (_this.state.error && _this.props.errorText || _this.state.status) {

        return React.createElement(
          "span",
          { className: "input__status" },
          _this.props.errorText || _this.state.status
        );
      }
    }, _this.style = function () {

      var style = {};

      if (_this.props.style) {
        style = (0, _extends3["default"])({}, style, _this.props.style);
      }

      if (_this.props.disabled) {
        style = (0, _extends3["default"])({}, style, {
          cursor: "inherit"
        });
      }

      return style;
    }, _temp), (0, _possibleConstructorReturn3["default"])(_this, _ret);
  }

  Input.prototype.componentWillMount = function componentWillMount() {
    if (this.props.defaultValue) {
      this.setState({ active: true });
    }
  };

  Input.prototype.componentDidMount = function componentDidMount() {
    var _this2 = this;

    if (this.props.autofocus) {
      this.refs["apollos-input"].focus();
    }

    // one day, I dream of a universal browser auto-fill event
    // until then. I'll keep on checking
    var target = ReactDOM.findDOMNode(this.refs["apollos-input"]);
    this.interval = setInterval(function () {

      if (_this2._previousValue === target.value || !target.value) {
        return;
      }

      if (!_this2._previousValue && target.value && !_this2.state.focused) {
        _this2.setValue(target.value);
      }

      _this2._previousValue = target.value;
    }, 20);

    // set value on re-render
    if (this.props.value) {
      this.setValue("$" + this.props.value);
    }
  };

  Input.prototype.componentWillUpdate = function componentWillUpdate(nextProps) {
    if (this.props.defaultValue != nextProps.defaultValue) {
      this.setValue(nextProps.defaultValue);
      this.setState({ focused: false });
    }
  };

  Input.prototype.componentWillUnmount = function componentWillUnmount() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  };

  Input.prototype.render = function render() {
    var _this3 = this;

    var inputclasses = ["input"];

    // theme overwrite
    if (this.props.theme) {
      inputclasses = this.props.theme;
    }
    // state mangaged classes
    if (this.state.active) {
      inputclasses.push("input--active");
    }
    if (this.state.focused) {
      inputclasses.push("input--focused");
    }
    if (this.state.error) {
      inputclasses.push("input--alert");
    }
    // custom added classes
    if (this.props.classes) {
      inputclasses = inputclasses.concat(this.props.classes);
    }

    return React.createElement(
      "div",
      { className: inputclasses.join(" "), style: this.props.style || {} },
      function () {
        if (!_this3.props.hideLabel) {
          return React.createElement(_Label2["default"], {
            labelFor: _this3.props.id || _this3.props.name || _this3.props.label,
            labelName: _this3.props.label || _this3.props.name,
            disabed: _this3.disabled()
          });
        }
      }(),
      React.createElement("input", {
        ref: "apollos-input",
        id: this.props.id || this.props.name || this.props.label,
        type: this.props.type,
        placeholder: this.props.placeholder || this.props.label,
        name: this.props.name || this.props.label,
        className: this.props.inputClasses,
        disabled: this.disabled(),
        onBlur: this.validate,
        onFocus: this.focus,
        onChange: this.format,
        defaultValue: this.props.defaultValue,
        style: this.style(),
        maxLength: this.props.maxLength || ""
      }),
      this.props.children,
      this.renderHelpText()
    );
  };

  return Input;
}(_react.Component);

exports["default"] = Input;
module.exports = exports['default'];