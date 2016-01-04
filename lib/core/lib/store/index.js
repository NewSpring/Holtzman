

// stored state for use with other packages
"use strict";

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _error = require("../error");

var _error2 = _interopRequireDefault(_error);

var routes = [];

var storeRoutes = function storeRoutes(route) {
  routes = routes.concat(route);return route;
};
var getRoutes = function getRoutes() {
  return routes;
};

exports["default"] = {
  storeRoutes: storeRoutes,
  getRoutes: getRoutes
};
module.exports = exports["default"];