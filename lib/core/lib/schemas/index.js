"use strict";

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _error = require("../error");

var _error2 = _interopRequireDefault(_error);

var Schemas = {};

Schemas.addSchema = function (name, schema) {

  if (Schemas[name]) {
    throw new _error2["default"]("Schema assigned", "Schema " + name + " is already registered");
  }

  if (!schema || typeof schema != "object") {
    throw new _error2["default"]("Schema TypeError", "Schema " + name + " requires an object");
  }

  Schemas[name] = schema;
  return;
};

exports["default"] = Schemas;
module.exports = exports["default"];