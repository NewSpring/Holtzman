"use strict";

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require("react");

var _reactDom = require("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _componentsLabel = require("./components/label");

var _componentsLabel2 = _interopRequireDefault(_componentsLabel);

var Input = (function (_Component) {
  _inherits(Input, _Component);

  function Input() {
    var _this = this;

    _classCallCheck(this, Input);

    _Component.apply(this, arguments);

    this.state = {
      active: false,
      focused: false,
      error: false,
      status: ""
    };

    this.format = function () {

      var target = ReactDOM.findDOMNode(_this.refs["apollos-input"]);
      var value = _this.refs["apollos-input"].value;

      if (_this.props.format && typeof _this.props.format === "function") {

        var newValue = _this.props.format(value, target);
        target.value = newValue;
      }
    };

    this.validate = function () {

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
    };

    this.focus = function (event) {
      _this.setState({
        active: true,
        error: false,
        focused: true
      });
    };

    this.setValue = function (value) {
      var node = ReactDOM.findDOMNode(_this.refs["apollos-input"]);
      node.value = value;
      _this.focus();
      _this.validate();
    };

    this.getValue = function () {
      return ReactDOM.findDOMNode(_this.refs["apollos-input"]).value;
    };

    this.setStatus = function (message) {
      _this.props.status = message;
    };

    this.disabled = function () {
      if (_this.props.disabled) {
        return _this.props.disabled;
      }
    };

    this.renderHelpText = function (message) {

      if (_this.state.error && _this.props.errorText || _this.state.status) {

        return React.createElement(
          "span",
          { className: "input__status" },
          _this.props.errorText || _this.state.status
        );
      }
    };
  }

  Input.prototype.componentWillMount = function componentWillMount() {
    if (this.props.defaultValue) {
      this.setState({ active: true });
    }
  };

  Input.prototype.componentWillUpdate = function componentWillUpdate(nextProps) {
    if (this.props.defaultValue != nextProps.defaultValue) {
      this.setValue(nextProps.defaultValue);
      this.setState({ focused: false });
    }
  };

  Input.prototype.render = function render() {
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
      (function () {
        if (!_this2.props.hideLabel) {
          return React.createElement(_componentsLabel2["default"], {
            labelFor: _this2.props.id || _this2.props.name || _this2.props.label,
            labelName: _this2.props.label || _this2.props.name
          });
        }
      })(),
      React.createElement("input", {
        ref: "apollos-input",
        id: this.props.id || this.props.ref || this.props.name || this.props.label,
        type: this.props.type,
        placeholder: this.props.placeholder || this.props.label,
        name: this.props.name || this.props.label,
        className: this.props.inputClasses,
        disabled: this.disabled(),
        onBlur: this.validate,
        onFocus: this.focus,
        onChange: this.format,
        defaultValue: this.props.defaultValue
      }),
      this.renderHelpText()
    );
  };

  return Input;
})(_react.Component);

exports["default"] = Input;
module.exports = exports["default"];