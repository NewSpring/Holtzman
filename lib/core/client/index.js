"use strict";

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

require("./startup");

var _actions = require("./actions");

var _actions2 = _interopRequireDefault(_actions);

var _blocks = require("./blocks");

var _blocks2 = _interopRequireDefault(_blocks);

var _components = require("./components");

var _components2 = _interopRequireDefault(_components);

// import Decorators from "./decorators"

var _layouts = require("./layouts");

var _layouts2 = _interopRequireDefault(_layouts);

var _middlewares = require("./middlewares");

var _middlewares2 = _interopRequireDefault(_middlewares);

var _reducers = require("./reducers");

var _reducers2 = _interopRequireDefault(_reducers);

exports["default"] = {
  Actions: _actions2["default"],
  Blocks: _blocks2["default"],
  Components: _components2["default"],
  // Decorators,
  Layouts: _layouts2["default"],
  Middlewares: _middlewares2["default"],
  Reducers: _reducers2["default"]
};
module.exports = exports["default"];