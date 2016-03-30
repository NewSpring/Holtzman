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

var _reactDom = require("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _Label = require("./components/Label");

var _Label2 = _interopRequireDefault(_Label);

var _select = {
  "select": "select__select___3BWd1"
};

var _select2 = _interopRequireDefault(_select);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// import ReactSelect from "react-select";

var Select = function (_Component) {
  (0, _inherits3["default"])(Select, _Component);

  function Select() {
    var _temp, _this, _ret;

    (0, _classCallCheck3["default"])(this, Select);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3["default"])(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.state = {
      active: false,
      focused: false,
      error: false,
      status: ""
    }, _this.focus = function (event) {
      _this.setState({
        active: true,
        error: false,
        focused: true
      });
    }, _this.setValue = function (value) {
      var node = ReactDOM.findDOMNode(_this.refs["apollos-select"]);
      node.value = value;
      _this.focus();
      // this.change()
    }, _this.getValue = function () {
      return ReactDOM.findDOMNode(_this.refs["apollos-select"]).value;
    }, _this.setStatus = function (message) {
      _this.props.status = message;
    }, _this.disabled = function () {
      if (_this.props.disabled) {
        return disabled;
      }
    }, _this.renderHelpText = function (message) {

      if (_this.state.error && _this.props.errorText || _this.state.status) {

        return React.createElement(
          "span",
          { className: "input__status" },
          _this.props.errorText || _this.state.status
        );
      }
    }, _this.change = function (e) {
      var _e$currentTarget = e.currentTarget;
      var id = _e$currentTarget.id;
      var value = _e$currentTarget.value;

      var target = ReactDOM.findDOMNode(_this.refs["apollos-select"]);
      // console.log(target)
      if (_this.props.onChange) {
        _this.props.onChange(value, e.currentTarget);
      }

      if (_this.props.validation) {
        _this.props.validation(value, e.currentTarget);
      }
    }, _this.validate = function () {
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
    }, _temp), (0, _possibleConstructorReturn3["default"])(_this, _ret);
  }

  Select.prototype.componentWillMount = function componentWillMount() {
    if (this.props.defaultValue) {
      this.setState({ active: true });
    }
  };

  Select.prototype.componentDidMount = function componentDidMount() {
    if (this.props.defaultValue) {
      var target = ReactDOM.findDOMNode(this.refs["apollos-select"]);

      if (this.props.onChange) {
        this.props.onChange(this.props.defaultValue, target);
      }

      if (this.props.validation) {
        this.props.validation(this.props.defaultValue, target);
      }
    }
  };

  Select.prototype.componentWillUpdate = function componentWillUpdate(nextProps) {
    if (this.props.defaultValue != nextProps.defaultValue) {
      this.setValue(nextProps.defaultValue);
      this.setState({ focused: false });
      var target = ReactDOM.findDOMNode(this.refs["apollos-select"]);
      this.change({
        value: nextProps.defaultValue,
        id: target.id,
        currentTarget: target
      });
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

    if (this.props.selected) {
      inputclasses.push("input--active");
    }

    return React.createElement(
      "div",
      { className: inputclasses.join(" ") + (" " + _select2["default"].select) },
      function () {
        if (!_this2.props.hideLabel) {
          return React.createElement(_Label2["default"], {
            labelFor: _this2.props.id || _this2.props.label || _this2.props.name,
            labelName: _this2.props.label || _this2.props.name
          });
        }
      }(),
      React.createElement(
        "select",
        {
          ref: "apollos-select",
          id: this.props.id || this.props.label || this.props.name,
          placeholder: this.props.placeholder || this.props.label,
          name: this.props.name || this.props.label,
          className: this.props.inputClasses,
          disabled: this.disabled(),
          onFocus: this.focus,
          onChange: this.change,
          defaultValue: this.props.defaultValue,
          value: this.props.selected

        },
        function () {
          if (_this2.props.placeholder || _this2.props.includeBlank) {
            return React.createElement(
              "option",
              { style: { display: "none" } },
              _this2.props.placeholder || ""
            );
          }
        }(),
        function () {
          if (_this2.props.deselect) {
            return React.createElement("option", null);
          }
        }(),
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
}(_react.Component);

// <ReactSelect
//   ref="apollos-select"
//   id={this.props.id || this.props.label || this.props.name}
//   placeholder={this.props.placeholder}
//   name={this.props.name || this.props.label }
//   className={this.props.inputClasses}
//   disabled={this.disabled()}
//   onFocus={this.focus}
//   onChange={this.change}
//   value={this.props.defaultValue}
//   options={this.props.items}
//   multi={false}
//   searchable={false}
//   clearable={false}
// />


exports["default"] = Select;
module.exports = exports['default'];