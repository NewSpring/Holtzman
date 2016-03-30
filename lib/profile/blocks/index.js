"use strict";

exports.__esModule = true;

var _likes = require("./likes");

var _likes2 = _interopRequireDefault(_likes);

var _following = require("./following");

var _following2 = _interopRequireDefault(_following);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

exports["default"] = {
  Likes: _likes2["default"],
  Following: _following2["default"]
};
module.exports = exports['default'];