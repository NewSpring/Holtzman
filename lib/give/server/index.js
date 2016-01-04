"use strict";

exports.__esModule = true;

require("./startup");

var _publications = require("./publications");

exports["default"] = {
  publish: _publications.publish
};
module.exports = exports["default"];