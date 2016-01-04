"use strict";

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _methods = require("./methods");

var _methods2 = _interopRequireDefault(_methods);

var _middlewares = require("./middlewares");

var _middlewares2 = _interopRequireDefault(_middlewares);

exports["default"] = {
  Methods: _methods2["default"],
  Middlewares: _middlewares2["default"]
};
module.exports = exports["default"];