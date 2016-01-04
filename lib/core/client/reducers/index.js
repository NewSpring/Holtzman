"use strict";

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _redux = require("redux");

var _utilities = require("./utilities");

var _modal = require("./modal/");

var _modal2 = _interopRequireDefault(_modal);

var _nav = require("./nav");

var _nav2 = _interopRequireDefault(_nav);

var _onBoard = require("./on-board");

var _onBoard2 = _interopRequireDefault(_onBoard);

var _sections = require("./sections");

var _sections2 = _interopRequireDefault(_sections);

_utilities.addReducer({
  modal: _modal2["default"],
  nav: _nav2["default"],
  onBoard: _onBoard2["default"],
  sections: _sections2["default"]
});

exports["default"] = {
  addReducer: _utilities.addReducer,
  createReducer: _utilities.createReducer,
  reducers: _utilities.reducers
};
module.exports = exports["default"];