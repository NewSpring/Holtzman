"use strict";

var _libCollections = require("../../lib/collections");

Meteor.publish("sections", function () {
  return _libCollections.Sections.find();
});