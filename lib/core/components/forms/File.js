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

var File = function (_Component) {
  (0, _inherits3["default"])(File, _Component);

  function File() {
    var _temp, _this, _ret;

    (0, _classCallCheck3["default"])(this, File);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3["default"])(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.state = {
      active: false,
      focused: false,
      error: false,
      status: ""
    }, _this.format = function (e) {

      var target = ReactDOM.findDOMNode(_this.refs["apollos-input"]);
      var value = _this.refs["apollos-input"].value;

      if (_this.props.format && typeof _this.props.format === "function") {

        var newValue = _this.props.format(value, target, e);
        target.value = newValue;
      }
    }, _this.validate = function () {

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
          error: !_this.props.validation(value, target)
        });
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
      if (_this.props.disabled) {
        return {
          cursor: "inherit"
        };
      }

      return {};
    }, _temp), (0, _possibleConstructorReturn3["default"])(_this, _ret);
  }

  File.prototype.componentWillMount = function componentWillMount() {
    if (this.props.defaultValue) {
      this.setState({ active: true });
    }
  };

  File.prototype.componentDidMount = function componentDidMount() {
    if (this.props.autofocus) {
      this.refs["apollos-input"].focus();
    }
  };

  File.prototype.componentWillUpdate = function componentWillUpdate(nextProps) {
    if (this.props.defaultValue != nextProps.defaultValue) {
      this.setValue(nextProps.defaultValue);
      this.setState({ focused: false });
    }
  };

  File.prototype.render = function render() {
    var _this2 = this;

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
        if (!_this2.props.hideLabel) {
          return React.createElement(_Label2["default"], {
            labelFor: _this2.props.id || _this2.props.name || _this2.props.label,
            labelName: _this2.props.label || _this2.props.name,
            disabed: _this2.disabled()
          });
        }
      }(),
      React.createElement("input", (0, _extends3["default"])({
        ref: "apollos-input",
        id: this.props.id || this.props.name || this.props.label,
        type: "file",
        placeholder: this.props.placeholder || this.props.label,
        name: this.props.name || this.props.label,
        className: this.props.inputClasses,
        disabled: this.disabled(),
        onBlur: this.validate,
        onFocus: this.focus,
        onChange: this.format,
        defaultValue: this.props.defaultValue,
        style: this.style()
      }, this.props)),
      this.renderHelpText()
    );
  };

  return File;
}(_react.Component);

exports["default"] = File;
module.exports = exports['default'];