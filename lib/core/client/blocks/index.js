"use strict";

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _authorzied = require("./authorzied");

var _authorzied2 = _interopRequireDefault(_authorzied);

var _onBoard = require("./on-board");

var _onBoard2 = _interopRequireDefault(_onBoard);

var _nav = require("./nav");

var _nav2 = _interopRequireDefault(_nav);

var _modal = require("./modal");

var _modal2 = _interopRequireDefault(_modal);

var _sections = require("./sections");

var _sections2 = _interopRequireDefault(_sections);

var Blocks = {
  Authorized: _authorzied2["default"],
  Nav: _nav2["default"],
  OnBoard: _onBoard2["default"],
  Modal: _modal2["default"],
  Sections: _sections2["default"]
};

exports["default"] = Blocks;
module.exports = exports["default"];