"use strict";

exports.__esModule = true;
/*global Meteor */

var upload = function upload(id, callback) {
  Meteor.call("file/upload/avatar", id, callback);
};

exports["default"] = upload;
module.exports = exports['default'];