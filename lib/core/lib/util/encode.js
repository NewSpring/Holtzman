"use strict";

exports.__esModule = true;

function base64Encode(str) {
  if (Buffer) {
    return new Buffer(str).toString("base64");
  }
}

exports.base64Encode = base64Encode;