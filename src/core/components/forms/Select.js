"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require("react");
var ReactDom = require("react-dom");
var Label_1 = require("./components/Label");
;
;
;
var Select = (function (_super) {
    __extends(Select, _super);
    function Select() {
        var _this = this;
        _super.apply(this, arguments);
        this.state = {
            active: false,
            focused: false,
            error: false,
            status: ""
        };
        this.focus = function () {
            _this.setState({
                active: true,
                error: false,
                focused: true
            });
        };
        this.setValue = function (value) {
            var node = ReactDom.findDOMNode(_this.refs["apollos-select"]);
            node.value = value;
            _this.focus();
        };
        this.getValue = function () {
            return ReactDom.findDOMNode(_this.refs["apollos-select"]).value;
        };
        this.setStatus = function (message) {
            _this.setState({
                status: message,
            });
        };
        this.disabled = function () {
            if (_this.props.disabled) {
                return true;
            }
            return false;
        };
        this.renderHelpText = function (message) {
            if ((_this.state.error && _this.props.errorText) || _this.state.status) {
                return (React.createElement("span", {className: "input__status"}, _this.props.errorText || _this.state.status));
            }
        };
        this.onChangeEvent = function (e) {
            var _a = e.currentTarget, id = _a.id, value = _a.value;
            var target = ReactDom.findDOMNode(_this.refs["apollos-select"]);
            if (_this.props.onChange) {
                _this.props.onChange(value, target, e);
            }
            if (_this.props.validation) {
                _this.props.validation(value, target, e);
            }
        };
        this.validate = function () {
            var target = ReactDom.findDOMNode(_this.refs["apollos-select"]);
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
                    error: !_this.props.validation(value, target, null)
                });
            }
        };
    }
    Select.prototype.componentWillMount = function () {
        if (this.props.defaultValue) {
            this.setState({ active: true });
        }
    };
    ;
    Select.prototype.componentDidMount = function () {
        if (this.props.defaultValue) {
            var target = ReactDom.findDOMNode(this.refs["apollos-select"]);
            if (this.props.onChange) {
                this.props.onChange(this.props.defaultValue, target, null);
            }
            if (this.props.validation) {
                this.props.validation(this.props.defaultValue, target, null);
            }
        }
    };
    ;
    Select.prototype.componentWillUpdate = function (nextProps) {
        if (this.props.defaultValue != nextProps.defaultValue) {
            this.setValue(nextProps.defaultValue);
            this.setState({ focused: false });
            var target = ReactDom.findDOMNode(this.refs["apollos-select"]);
            if (this.props.onChange) {
                this.props.onChange(nextProps.defaultValue, target, null);
            }
            if (this.props.validation) {
                this.props.validation(nextProps.defaultValue, target, null);
            }
        }
    };
    ;
    Select.prototype.render = function () {
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
        if (this.props.selected)
            inputclasses.push("input--active");
        return (React.createElement("div", {className: inputclasses.join(" ")}, 
            (function () {
                if (!_this.props.hideLabel) {
                    return (React.createElement(Label_1.default, {labelFor: _this.props.id || _this.props.label || _this.props.name, labelName: _this.props.label || _this.props.name, disabled: _this.disabled()}));
                }
            })(), 
            React.createElement("select", {ref: "apollos-select", id: this.props.id || this.props.label || this.props.name, placeholder: this.props.placeholder || this.props.label, name: this.props.name || this.props.label, className: this.props.inputClasses, disabled: this.disabled(), onFocus: this.focus, onChange: this.onChangeEvent, defaultValue: this.props.defaultValue, value: this.props.selected}, 
                (function () {
                    if (_this.props.placeholder || _this.props.includeBlank) {
                        return (React.createElement("option", {style: { display: "none" }}, _this.props.placeholder || ""));
                    }
                })(), 
                (function () {
                    if (_this.props.deselect) {
                        return (React.createElement("option", null));
                    }
                })(), 
                (function () {
                    if (_this.props.items) {
                        return _this.props.items.map(function (option, key) {
                            return (React.createElement("option", {className: _this.props.optionClasses, value: option.value || option.label, key: key}, option.label || option.value));
                        });
                    }
                })()), 
            this.renderHelpText(null)));
    };
    ;
    return Select;
}(React.Component));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Select;
