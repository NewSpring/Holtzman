"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require("react");
var ReactDom = require("react-dom");
var lodash_1 = require("lodash");
var Label_1 = require("./components/Label");
(function (InputType) {
    InputType[InputType["email"] = 0] = "email";
    InputType[InputType["text"] = 1] = "text";
    InputType[InputType["tel"] = 2] = "tel";
})(exports.InputType || (exports.InputType = {}));
var InputType = exports.InputType;
;
;
;
var Input = (function (_super) {
    __extends(Input, _super);
    function Input() {
        var _this = this;
        _super.apply(this, arguments);
        this.state = {
            active: false,
            focused: false,
            error: false,
            status: "",
        };
        this.format = function (e) {
            var target = ReactDom.findDOMNode(_this.refs["apollos-input"]);
            var value = _this.refs["apollos-input"].value;
            if (_this.props.format && typeof (_this.props.format) === "function") {
                var newValue = _this.props.format(value, target, e);
                target.value = newValue;
            }
            if (_this.props.onChange && typeof (_this.props.onChange) === "function") {
                _this.props.onChange(target.value, target, e);
            }
        };
        this.validate = function (e) {
            var target = ReactDom.findDOMNode(_this.refs["apollos-input"]);
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
            if (_this.props.validation && typeof (_this.props.validation) === "function") {
                _this.setState({
                    error: !_this.props.validation(value, target, e),
                });
            }
            if (_this.props.onBlur && typeof (_this.props.onBlur) === "function") {
                _this.props.onBlur(value, target, e);
            }
        };
        this.focus = function () {
            _this.setState({
                active: true,
                error: false,
                focused: true,
            });
        };
        this.setValue = function (value) {
            var node = ReactDom.findDOMNode(_this.refs["apollos-input"]);
            node.value = value;
            _this.focus();
            _this.validate(null);
        };
        this.getValue = function () {
            return ReactDom.findDOMNode(_this.refs["apollos-input"]).value;
        };
        this.setStatus = function (message) {
            _this.setState({
                status: message,
            });
        };
        this.disabled = function () {
            if (_this.props.disabled) {
                return _this.props.disabled;
            }
            return false;
        };
        this.renderHelpText = function () {
            if ((_this.state.error && _this.props.errorText) || _this.state.status) {
                return (React.createElement("span", {className: "input__status"}, _this.props.errorText || _this.state.status));
            }
        };
        this.style = function () {
            var style = {};
            if (_this.props.style) {
                style = lodash_1.assign(style, _this.props.style);
            }
            if (_this.props.disabled) {
                style = lodash_1.assign(style, { cursor: "inherit" });
            }
            return style;
        };
    }
    Input.prototype.componentWillMount = function () {
        if (this.props.defaultValue) {
            this.setState({ active: true });
        }
    };
    ;
    Input.prototype.componentDidMount = function () {
        var _this = this;
        if (this.props.autofocus) {
            this.refs["apollos-input"].focus();
        }
        var target = ReactDom.findDOMNode(this.refs["apollos-input"]);
        this.interval = setInterval(function () {
            if (_this._previousValue === target.value || !target.value) {
                return;
            }
            if (!_this._previousValue && target.value && !_this.state.focused) {
                _this.setValue(target.value);
            }
            _this._previousValue = target.value;
        }, 20);
        if (this.props.value) {
            this.setValue("$" + this.props.value);
        }
    };
    ;
    Input.prototype.componentWillUpdate = function (nextProps) {
        if (this.props.defaultValue != nextProps.defaultValue) {
            this.setValue(nextProps.defaultValue);
            this.setState({ focused: false });
        }
    };
    ;
    Input.prototype.componentWillUnmount = function () {
        if (this.interval) {
            clearInterval(this.interval);
        }
    };
    ;
    Input.prototype.render = function () {
        var _this = this;
        var inputclasses = [
            "input"
        ];
        if (this.props.theme)
            inputclasses = this.props.theme.split(" ");
        if (this.state.active)
            inputclasses.push("input--active");
        if (this.state.focused)
            inputclasses.push("input--focused");
        if (this.state.error)
            inputclasses.push("input--alert");
        if (this.props.classes)
            inputclasses = inputclasses.concat(this.props.classes);
        return (React.createElement("div", {className: inputclasses.join(" "), style: this.props.style || {}}, 
            (function () {
                if (!_this.props.hideLabel) {
                    return (React.createElement(Label_1.default, {labelFor: _this.props.id || _this.props.name || _this.props.label, labelName: _this.props.label || _this.props.name, disabled: _this.disabled()}));
                }
            })(), 
            React.createElement("input", {ref: "apollos-input", id: this.props.id || this.props.name || this.props.label, type: this.props.type, placeholder: this.props.placeholder || this.props.label, name: this.props.name || this.props.label, className: this.props.inputClasses, disabled: this.disabled(), onBlur: this.validate, onFocus: this.focus, onChange: this.format, defaultValue: this.props.defaultValue, style: this.style(), maxLength: this.props.maxLength || ""}), 
            this.props.children, 
            this.renderHelpText()));
    };
    ;
    return Input;
}(React.Component));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Input;
;
