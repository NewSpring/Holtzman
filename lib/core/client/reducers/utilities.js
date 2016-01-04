// stored state for use with other packages
"use strict";

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _libError = require("../../lib/error");

var _libError2 = _interopRequireDefault(_libError);

var reducers = {};

var addReducer = function addReducer(obj) {

  for (var _name in obj) {
    var handler = obj[_name];

    if (reducers[_name]) {
      throw new _libError2["default"]("Reducer assigned", "reducers function " + _name + " is already registered");
    }

    if (!handler || typeof handler != "function") {
      throw new _libError2["default"]("Reducer TypeError", "Reducer " + _name + " requires a function");
    }

    reducers[_name] = handler;
  }

  return obj;
};

var createReducer = function createReducer(initialState, handlers) {

  return function (state, action) {
    if (state === undefined) state = initialState;

    // better than switch statement
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action);
    } else {
      return state;
    }
  };
};

exports["default"] = {
  addReducer: addReducer,
  createReducer: createReducer,
  reducers: reducers
};
module.exports = exports["default"];