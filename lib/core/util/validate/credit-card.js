"use strict";

exports.__esModule = true;
exports.creditCVV = exports.creditExpiry = exports.creditCard = undefined;

var _defaults = require("../regex/defaults");

var _defaults2 = _interopRequireDefault(_defaults);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var creditCard = function creditCard(value) {

  value = value.replace(/-/g, "");

  if (_defaults2["default"].startOfVisa.test(value)) {

    var regex = /^4[0-9]{12}(?:[0-9]{3})?$/;

    return regex.test(value);
  } else if (_defaults2["default"].startOfMastercard.test(value)) {

    var _regex = /^5[1-5][0-9]{14}$/;
    return _regex.test(value);
  } else if (_defaults2["default"].startOfAmEx.test(value)) {

    var _regex2 = /^3[47][0-9]{13}$/;
    return _regex2.test(value);
  } else if (_defaults2["default"].startOfDiscover.test(value)) {

    var _regex3 = /^6(?:011|5[0-9]{2})[0-9]{12}$/;
    return _regex3.test(value);
  } else {

    return false;
  }
};

var creditExpiry = function creditExpiry(value) {

  var regex = /^((0[1-9])|(1[0-2]))\/((2009)|(20[1-2][0-9]))$/;
  return regex.test(value);
};

var creditCVV = function creditCVV(value) {

  var regex = /^[0-9]{3,4}$/;
  return regex.test(value);
};

exports.creditCard = creditCard;
exports.creditExpiry = creditExpiry;
exports.creditCVV = creditCVV;