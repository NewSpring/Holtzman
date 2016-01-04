"use strict";

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

require("./startup");

var _actions = require("./actions");

var _actions2 = _interopRequireDefault(_actions);

var _blocks = require("./blocks");

var _blocks2 = _interopRequireDefault(_blocks);

var _components = require("./components/");

var _components2 = _interopRequireDefault(_components);

var _layouts = require("./layouts");

var _layouts2 = _interopRequireDefault(_layouts);

var _pages = require("./pages");

var _pages2 = _interopRequireDefault(_pages);

var _reducers = require("./reducers");

var _reducers2 = _interopRequireDefault(_reducers);

exports["default"] = {
  actions: _actions2["default"],
  blocks: _blocks2["default"],
  components: _components2["default"],
  layouts: _layouts2["default"],
  pages: _pages2["default"],
  reducers: _reducers2["default"]
};
module.exports = exports["default"];