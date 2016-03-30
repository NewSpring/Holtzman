"use strict";

exports.__esModule = true;
/*global Meteor */

var join = function join(id, message, callback) {
  Meteor.call("community/actions/join", id, message, callback);
};

exports.join = join;