"use strict";

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _splitParent = require("./split.parent");

var _splitParent2 = _interopRequireDefault(_splitParent);

var _splitLeft = require("./split.left");

var _splitLeft2 = _interopRequireDefault(_splitLeft);

var _splitRight = require("./split.right");

var _splitRight2 = _interopRequireDefault(_splitRight);

exports["default"] = {
  Split: _splitParent2["default"],
  Left: _splitLeft2["default"],
  Right: _splitRight2["default"]
};
module.exports = exports["default"];