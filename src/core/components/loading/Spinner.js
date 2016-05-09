"use strict";
var React = require("react");
function getClasses(mergeClasses) {
    var classes = [
        "loader"
    ];
    if (mergeClasses) {
        classes = classes.concat(mergeClasses);
    }
    return classes.join(" ");
}
;
var Spinner = function (_a) {
    var theme = _a.theme, styles = _a.styles, classes = _a.classes;
    return (React.createElement("div", {className: theme || getClasses(classes), style: styles || {}}));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Spinner;
