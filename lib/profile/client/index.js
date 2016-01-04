"use strict";

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

require("./startup");

// import actions from "./actions"
// import blocks from "./blocks"
// import components/ from "./components/"
// import layouts from "./layouts"

var _pages = require("./pages");

var _pages2 = _interopRequireDefault(_pages);

// import reducers/ from "./reducers"

exports["default"] = {
  // actions,
  // blocks,
  // components,
  // layouts,
  pages: _pages2["default"]
};
module.exports = exports["default"];
// reducers