// stored middlewares for use with other packages
"use strict";

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _libError = require("../../lib/error");

var _libError2 = _interopRequireDefault(_libError);

var middlewares = [];

var addMiddleware = function addMiddleware() {
  for (var _len = arguments.length, newWares = Array(_len), _key = 0; _key < _len; _key++) {
    newWares[_key] = arguments[_key];
  }

  for (var _iterator = newWares, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
    var _ref;

    if (_isArray) {
      if (_i >= _iterator.length) break;
      _ref = _iterator[_i++];
    } else {
      _i = _iterator.next();
      if (_i.done) break;
      _ref = _i.value;
    }

    var middleware = _ref;
    middlewares.push(middleware);
  }
};

exports["default"] = {
  addMiddleware: addMiddleware,
  middlewares: middlewares
};
module.exports = exports["default"];