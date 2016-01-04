"use strict";

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _error = require("../error");

var _error2 = _interopRequireDefault(_error);

var _inherit = require("./inherit");

var _encode = require("./encode");

var _guid = require("./guid");

var _xml = require("./xml");

var _xml2 = _interopRequireDefault(_xml);

var Util = {};

Util.addUtil = function (name, handler) {

  if (Util[name]) {
    throw new _error2["default"]("Util assigned", "Util function " + name + " is already registered");
  }

  if (!handler || typeof handler != "function") {
    throw new _error2["default"]("Util TypeError", "Util " + name + " requires a function");
  }

  Util[name] = handler;
  return;
};

Util.addUtil("inherit", _inherit.inherit);

Util.addUtil("base64Encode", _encode.base64Encode);

Util.addUtil("makeNewGuid", _guid.makeNewGuid);

Util.addUtil("parseXML", _xml2["default"].parse);

exports["default"] = Util;
module.exports = exports["default"];