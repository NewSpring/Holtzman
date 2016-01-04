"use strict";

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _person = require("./person");

var _person2 = _interopRequireDefault(_person);

var _campuses = require("./campuses");

var _campuses2 = _interopRequireDefault(_campuses);

var publications = {
  person: _person2["default"],
  campuses: _campuses2["default"]
};

var publish = function publish() {
  for (var publication in publications) {
    publications[publication]();
  }
};

exports["default"] = {
  person: _person2["default"],
  campuses: _campuses2["default"],
  publish: publish
};
module.exports = exports["default"];