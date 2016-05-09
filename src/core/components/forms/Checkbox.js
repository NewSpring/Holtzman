"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require("react");
var Label_1 = require("./components/Label");
;
;
var Checkbox = (function (_super) {
    __extends(Checkbox, _super);
    function Checkbox() {
        var _this = this;
        _super.apply(this, arguments);
        this.state = {
            status: false,
            error: false,
        };
        this.setStatus = function (message) {
            _this.props.status = message;
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
    }
    Checkbox.prototype.render = function () {
        var _this = this;
        var inputclasses = [
            "input"
        ];
        if (this.props.theme)
            inputclasses = this.props.theme.split(" ");
        if (this.state.status)
            inputclasses.push("push-double-bottom");
        if (this.props.type) {
            inputclasses.push(this.props.type);
        }
        else {
            inputclasses.push("checkbox");
        }
        if (this.state.error)
            inputclasses.push("input--alert");
        if (this.props.classes)
            inputclasses = inputclasses.concat(this.props.classes);
        return (React.createElement("div", {className: inputclasses.join(" ")}, 
            React.createElement("h6", {className: "soft-left push-half-left flush-bottom text-left float-left locked-top"}, 
                React.createElement("small", null, this.props.children)
            ), 
            React.createElement("input", {ref: this.props.id || this.props.label || this.props.name, id: this.props.id || this.props.label || this.props.name, type: this.props.type || "checkbox", name: this.props.name || this.props.label, className: this.props.inputClasses, disabled: this.disabled(), defaultChecked: this.props.defaultValue ? "checked" : "", onClick: this.props.clicked, style: { width: 0 }}), 
            (function () {
                if (!_this.props.hideLabel) {
                    return (React.createElement(Label_1.default, {labelFor: _this.props.id || _this.props.label || _this.props.name, labelName: _this.props.label || _this.props.name, disabled: _this.disabled()}));
                }
            })(), 
            this.renderHelpText()));
    };
    return Checkbox;
}(React.Component));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Checkbox;
