"use strict";

exports.__esModule = true;

var update = function update(data, callback) {
  Meteor.call("Rock.auth.update", data, callback);
};

exports["default"] = update;
module.exports = exports["default"];