"use strict";
var React = require("react");
function getClasses(mergeClasses) {
    var classes = [
        "flush-bottom"
    ];
    if (mergeClasses) {
        classes = classes.concat(mergeClasses);
    }
    return classes.join(" ");
}
;
;
var Fieldset = function (_a) {
    var theme = _a.theme, classes = _a.classes, children = _a.children;
    return (React.createElement("fieldset", {className: theme || getClasses(classes)}, children));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Fieldset;
