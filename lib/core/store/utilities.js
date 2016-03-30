"use strict";

exports.__esModule = true;

var _error = require("../util/error");

var _error2 = _interopRequireDefault(_error);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// stored state for use with other packages
var reducers = {};


var addReducer = function addReducer(obj) {

  for (var name in obj) {
    var handler = obj[name];

    if (reducers[name]) {
      throw new _error2["default"]("Reducer assigned", "reducers function " + name + " is already registered");
    }

    if (!handler || typeof handler != "function") {
      throw new _error2["default"]("Reducer TypeError", "Reducer " + name + " requires a function");
    }

    reducers[name] = handler;
  }

  return obj;
};

var createReducer = function createReducer(initialState, handlers) {

  return function () {
    var state = arguments.length <= 0 || arguments[0] === undefined ? initialState : arguments[0];
    var action = arguments[1];

    // better than switch statement
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action);
    } else {
      return state;
    }
  };
};

// stored middlewares for use with other packages
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

// stored sagas for use with other packages
var sagas = [];

var addSaga = function addSaga() {
  for (var _len2 = arguments.length, newSagas = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    newSagas[_key2] = arguments[_key2];
  }

  var _loop = function _loop() {
    if (_isArray2) {
      if (_i2 >= _iterator2.length) return "break";
      _ref2 = _iterator2[_i2++];
    } else {
      _i2 = _iterator2.next();
      if (_i2.done) return "break";
      _ref2 = _i2.value;
    }

    var saga = _ref2;
    sagas.push(function () {
      return saga;
    });
  };

  for (var _iterator2 = newSagas, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
    var _ref2;

    var _ret = _loop();

    if (_ret === "break") break;
  }
};

exports["default"] = {
  addMiddleware: addMiddleware,
  middlewares: middlewares,

  addReducer: addReducer,
  createReducer: createReducer,
  reducers: reducers,

  sagas: sagas,
  addSaga: addSaga

};
module.exports = exports['default'];