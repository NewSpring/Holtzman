"use strict";

exports.__esModule = true;
exports.Routes = exports.GraphQL = exports.createReduxStore = exports.wrapper = exports.publish = undefined;

require("./startup");

var _publications = require("./publications");

var _publications2 = _interopRequireDefault(_publications);

var _store = require("./store");

var _graphql = require("./graphql");

var _pages = require("./pages");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

exports.publish = _publications2["default"];
exports.wrapper = _store.wrapper;
exports.createReduxStore = _store.createReduxStore;
exports.GraphQL = _graphql.GraphQL;
exports.Routes = _pages.Routes;
/*

  Apollos Core

*/