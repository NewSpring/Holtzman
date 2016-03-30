"use strict";

exports.__esModule = true;
exports.createReduxStore = exports.wrapper = undefined;

var _typeof2 = require("babel-runtime/helpers/typeof");

var _typeof3 = _interopRequireDefault(_typeof2);

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _react = require("react");

var _redux = require("redux");

var _reactRedux = require("react-redux");

var _global = require("../blocks/global");

var _global2 = _interopRequireDefault(_global);

var _utilities = require("./utilities");

var _routing = require("../store/routing");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// let logger;
// if (process.env.NODE_ENV === "development") {
// const createLogger = require("redux-logger")
// logger = createLogger()
// }

// import "regenerator-runtime/runtime";

var createReduxStore = function createReduxStore(initialState, history) {

  if (initialState) {
    // bug with SSR
    delete initialState.nav;
  }

  var joinedReducers = (0, _extends3["default"])({}, _utilities.reducers, {
    routing: _routing.routeReducer
  });

  var convertedSagas = _utilities.sagas.map(function (saga) {
    return saga();
  });

  var sharedMiddlewares = [].concat(_utilities.middlewares);

  var reduxRouterMiddleware = (0, _routing.syncHistory)(history);
  var sharedCompose = [_redux.applyMiddleware.apply(undefined, sharedMiddlewares.concat([
  // sagaMiddleware(...convertedSagas),
  reduxRouterMiddleware]))];

  if (process.env.NODE_ENV != "production") {
    sharedCompose = [].concat(sharedCompose, [(typeof window === "undefined" ? "undefined" : (0, _typeof3["default"])(window)) === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : function (f) {
      return f;
    }]);
  }

  var store = _redux.compose.apply(undefined, sharedCompose)(_redux.createStore)((0, _redux.combineReducers)(joinedReducers), initialState);

  return store;
};

// import sagaMiddleware from "redux-saga";


var wrapper = _reactRedux.Provider;

exports.wrapper = wrapper;
exports.createReduxStore = createReduxStore;