"use strict";

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _react = require("react");

var _redux = require("redux");

var _reduxSimpleRouter = require("redux-simple-router");

var _reactRedux = require("react-redux");

var _reduxThunk = require("redux-thunk");

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _clientReducers = require("./client/reducers");

var _libStore = require("./lib/store");

var _clientMiddlewares = require("./client/middlewares");

var createReduxStore = function createReduxStore(initialState, history) {

  var routes = _libStore.getRoutes();
  var joinedReducers = _extends({}, _clientReducers.reducers, {
    routing: _reduxSimpleRouter.routeReducer
  });

  var sharedMiddlewares = [_reduxThunk2["default"]].concat(_clientMiddlewares.middlewares);

  var sharedCompose = [_redux.applyMiddleware.apply(undefined, sharedMiddlewares)];

  if (process.env.NODE_ENV != "production") {
    sharedCompose = [].concat(sharedCompose, [typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : function (f) {
      return f;
    }]);
  }

  var store = _redux.compose.apply(undefined, sharedCompose)(_redux.createStore)(_redux.combineReducers(joinedReducers), initialState);
  // syncReduxAndRouter(history, store)

  return store;
};

// class Wrapper extends Component {
//   componentWillMount() {
//     this.store = createReduxStore()
//   }
//
//   render () {
//     return (
//       <Provider store={this.store}>{this.props.children}</Provider>
//     )
//   }
// }

exports.Wrapper = _reactRedux.Provider;
exports.createReduxStore = createReduxStore;