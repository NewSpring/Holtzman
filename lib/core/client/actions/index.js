"use strict";

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _nav = require("./nav");

var _nav2 = _interopRequireDefault(_nav);

var _onBoard = require("./on-board");

var _onBoard2 = _interopRequireDefault(_onBoard);

var _modal = require("./modal");

var _modal2 = _interopRequireDefault(_modal);

var _sections = require("./sections");

var _sections2 = _interopRequireDefault(_sections);

exports["default"] = {
  modal: _modal2["default"],
  nav: _nav2["default"],
  onBoard: _onBoard2["default"],
  sections: _sections2["default"]
};
module.exports = exports["default"];