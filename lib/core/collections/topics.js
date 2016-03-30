"use strict";

exports.__esModule = true;
/*global Mongo*/
var Topics = new Mongo.Collection("topics");

exports["default"] = Topics;
module.exports = exports['default'];