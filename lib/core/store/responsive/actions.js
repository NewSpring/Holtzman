"use strict";

exports.__esModule = true;
exports["default"] = {
  setBreakpoints: function setBreakpoints(breakpoints) {
    return { type: "@@RESPONSIVE.SET_BREAKPOINT", breakpoints: breakpoints };
  },
  setWidth: function setWidth(width) {
    return { type: "@@RESPONSIVE.SET_WIDTH", width: width };
  },
  setHeight: function setHeight(height) {
    return { type: "@@RESPONSIVE.SET_HEIGHT", height: height };
  }
};
module.exports = exports['default'];