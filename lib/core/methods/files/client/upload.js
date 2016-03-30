"use strict";

exports.__esModule = true;
/*global Meteor */

var upload = function upload(file, callback) {
  Meteor.call("file/upload", file, callback);
};

exports["default"] = upload;
module.exports = exports['default'];