"use strict";

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _collectionsPeople = require("./collections.people");

var _collectionsPeople2 = _interopRequireDefault(_collectionsPeople);

var _collectionsCampuses = require("./collections.campuses");

var _collectionsCampuses2 = _interopRequireDefault(_collectionsCampuses);

exports["default"] = {
  People: _collectionsPeople2["default"],
  Campuses: _collectionsCampuses2["default"]
};
module.exports = exports["default"];