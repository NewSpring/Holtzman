/*

  toCurrency
  @param num [Number] convert a number into American Currency

*/
'use strict';

exports.__esModule = true;
function toCurrency(num) {
  return '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
}

exports.toCurrency = toCurrency;