"use strict";

exports.__esModule = true;

var _avatar = require("./avatar");

var _avatar2 = _interopRequireDefault(_avatar);

var _upload = require("./upload");

var _upload2 = _interopRequireDefault(_upload);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

exports["default"] = {
  avatar: _avatar2["default"],
  upload: _upload2["default"]
};
module.exports = exports['default'];