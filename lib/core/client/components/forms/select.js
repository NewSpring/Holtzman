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

var Select = (function (_Component) {
  _inherits(Select, _Component);

  function Select() {
    var _this = this;

    _classCallCheck(this, Select);

    _Component.apply(this, arguments);

    this.state = {
      active: false,
      focused: false,
      error: false,
      status: ""
    };

    this.focus = function (event) {
      _this.setState({
        active: true,
        error: false,
        focused: true
      });
    };

    this.setValue = function (value) {
      var node = ReactDOM.findDOMNode(_this.refs["apollos-select"]);
      node.value = value;
      _this.focus();
      // this.change()
    };

    this.getValue = function () {
      return ReactDOM.findDOMNode(_this.refs["apollos-select"]).value;
    };

    this.setStatus = function (message) {
      _this.props.status = message;
    };

    this.disabled = function () {
      if (_this.props.disabled) {
        return disabled;
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

    this.change = function (e) {
      var _e$target = e.target;
      var id = _e$target.id;
      var value = _e$target.value;

      if (_this.props.onChange) {
        _this.props.onChange(value, e.target);
      }

      if (_this.props.validation) {
        _this.props.validation(value, e.target);
      }
    };

    this.validate = function () {
      var target = ReactDOM.findDOMNode(_this.refs["apollos-select"]);
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
  }

  Select.prototype.componentWillMount = function componentWillMount() {
    if (this.props.defaultValue) {
      this.setState({ active: true });
    }
  };

  Select.prototype.componentWillUpdate = function componentWillUpdate(nextProps) {
    if (this.props.defaultValue != nextProps.defaultValue) {
      this.setValue(nextProps.defaultValue);
      this.setState({ focused: false });
    }
  };

  Select.prototype.render = function render() {
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
      { className: inputclasses.join(" ") },
      (function () {
        if (!_this2.props.hideLabel) {
          return React.createElement(_componentsLabel2["default"], {
            labelFor: _this2.props.id || _this2.props.label || _this2.props.name,
            labelName: _this2.props.label || _this2.props.name
          });
        }
      })(),
      React.createElement(
        "select",
        {
          ref: "apollos-select",
          id: this.props.id || this.props.ref || this.props.label || this.props.name,
          placeholder: this.props.placeholder || this.props.label,
          name: this.props.name || this.props.label,
          className: this.props.inputClasses,
          disabled: this.disabled(),
          onFocus: this.focus,
          onChange: this.change,
          defaultValue: this.props.defaultValue
        },
        (function () {
          if (_this2.props.placeholder || _this2.props.includeBlank) {
            return React.createElement(
              "option",
              {
                className: _this2.props.optionClasses,
                value: "",
                disabled: true
              },
              _this2.props.placeholder || ""
            );
          }
        })(),
        this.props.items.map(function (option, key) {
          return React.createElement(
            "option",
            {
              className: _this2.props.optionClasses,
              value: option.value || option.label,
              key: key
            },
            option.label || option.value
          );
        })
      ),
      this.renderHelpText()
    );
  };

  return Select;
})(_react.Component);

exports["default"] = Select;
module.exports = exports["default"];