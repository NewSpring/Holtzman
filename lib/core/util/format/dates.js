"use strict";

exports.__esModule = true;

/*

  toDateString

*/
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function toDateString(dateObj, abbreviated) {
  var year = dateObj.getFullYear();
  var date = dateObj.getDate();
  var month = dateObj.getMonth();
  var monthName = months[month];

  if (abbreviated) {
    monthName = monthName.substring(0, 3);
  }

  return monthName + " " + date + ", " + year;
}

exports.toDateString = toDateString;