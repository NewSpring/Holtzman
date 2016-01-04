"use strict";

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _format = require("../format");

var _format2 = _interopRequireDefault(_format);

var _validate = require("../validate");

var _validate2 = _interopRequireDefault(_validate);

var _error = require("../error");

var _error2 = _interopRequireDefault(_error);

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
var d = /^6$|^6[05]$|^601[1]?$|^65[0-9][0-9]?$|^6(?:011|5[0-9]{2})[0-9]{0,12}$/;

var defaultRegex = {
  email: /[\w\.\'_%-]+(\+[\w-]*)?@([\w-]+\.)+[\w-]+/,
  bcrypt: /^\$2a\$10\$[\/\.a-zA-Z0-9]{53}$/,
  phoneNumber: /^[1-9]([0-9]{6}|[0-9]{9})$/,
  guid: /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i,
  visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
  mastercard: /^5[1-5][0-9]{14}$/,
  americanExpress: /^3[47][0-9]{13}$/,
  discover: /^6(?:011|5[0-9]{2})[0-9]{12}$/,
  startOfVisa: /^4[0-9]{0,15}$/,
  startOfMastercard: /^5$|^5[1-5][0-9]{0,14}$/,
  startOfAmEx: /^3$|^3[47][0-9]{0,13}$/,
  startOfDiscover: d
};

for (var _name in defaultRegex) {
  var _regex = defaultRegex[_name];

  Regex.addRegex(_name, _regex, true);
}

exports.defaultRegex = defaultRegex;
exports["default"] = Regex;