"use strict";

exports.__esModule = true;
exports.defaultRegex = undefined;

var _format = require("../format");

var _format2 = _interopRequireDefault(_format);

var _validate = require("../validate");

var _validate2 = _interopRequireDefault(_validate);

var _error = require("../error");

var _error2 = _interopRequireDefault(_error);

var _defaults = require("./defaults");

var _defaults2 = _interopRequireDefault(_defaults);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Regex = {};


Regex.addRegex = function (name, test, validate) {

  if (Regex[name]) {
    throw new _error2["default"]("Regex assigned", "Regex " + name + " is already registered");
  }

  if (!test || !test instanceof RegExp) {
    throw new _error2["default"]("Regex TypeError", "Regexter " + name + " requires a regex");
  }

  Regex[name] = test;

  if (validate) {
    var funcName = "is" + _format2["default"].capitalize(name);
    _validate2["default"].addValidator(funcName, function (str) {
      return test.test(str);
    });
  }
  return;
};

/*

  Defualt regexes

*/
// such a long regex

for (var name in _defaults2["default"]) {
  var _regex = _defaults2["default"][name];
  Regex.addRegex(name, _regex, true);
}

exports.defaultRegex = _defaults2["default"];
exports["default"] = Regex;