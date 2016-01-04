"use strict";

exports.__esModule = true;

var _regex = require("../regex");

var creditCard = function creditCard(value) {

  value = value.replace(/-/g, "");

  if (_regex.defaultRegex.startOfVisa.test(value)) {

    var regex = /^4[0-9]{12}(?:[0-9]{3})?$/;

    return regex.test(value);
  } else if (_regex.defaultRegex.startOfMastercard.test(value)) {

    var regex = /^5[1-5][0-9]{14}$/;
    return regex.test(value);
  } else if (_regex.defaultRegex.startOfAmEx.test(value)) {

    var regex = /^3[47][0-9]{13}$/;
    return regex.test(value);
  } else if (_regex.defaultRegex.startOfDiscover.test(value)) {

    var regex = /^6(?:011|5[0-9]{2})[0-9]{12}$/;
    return regex.test(value);
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

exports["default"] = {
  creditCard: creditCard,
  creditExpiry: creditExpiry,
  creditCVV: creditCVV
};
module.exports = exports["default"];