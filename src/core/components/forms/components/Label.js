"use strict";
var React = require("react");
function style(disabled) {
    if (disabled)
        return { cursor: "inherit" };
    return {};
}
;
;
var Label = function (_a) {
    var labelFor = _a.labelFor, labelName = _a.labelName, disabled = _a.disabled;
    return (React.createElement("label", {htmlFor: labelFor, style: style(disabled)}, labelName));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Label;
