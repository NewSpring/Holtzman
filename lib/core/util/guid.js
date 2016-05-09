"use strict";

exports.__esModule = true;

function s4() {
  return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
}

function makeNewGuid() {
  var guid = "" + s4() + s4() + "-" + s4() + "-" + s4() + "-" + s4() + "-" + s4() + s4() + s4();
  return guid.toUpperCase();
}

exports.makeNewGuid = makeNewGuid;