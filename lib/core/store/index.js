"use strict";

exports.__esModule = true;
exports.cancel = exports.join = exports.call = exports.fork = exports.put = exports.take = exports.addSaga = exports.createReducer = exports.addReducer = exports.addMiddleware = exports.createReduxStore = exports.wrapper = exports.responsive = exports.filters = exports.search = exports.routing = exports.comingsoon = exports.share = exports.collections = exports.topics = exports.sections = exports.accounts = exports.nav = exports.modal = exports.liked = exports.campuses = undefined;

require("regenerator-runtime/runtime");

var _liked = require("./liked");

var _liked2 = _interopRequireDefault(_liked);

var _modal = require("./modal");

var _modal2 = _interopRequireDefault(_modal);

var _nav = require("./nav");

var _nav2 = _interopRequireDefault(_nav);

var _accounts = require("./accounts");

var _accounts2 = _interopRequireDefault(_accounts);

var _sections = require("./sections");

var _sections2 = _interopRequireDefault(_sections);

var _topics = require("./topics");

var _topics2 = _interopRequireDefault(_topics);

var _campuses = require("./campuses");

var _campuses2 = _interopRequireDefault(_campuses);

var _collections = require("./collections");

var _collections2 = _interopRequireDefault(_collections);

var _routing = require("./routing");

var _routing2 = _interopRequireDefault(_routing);

var _share = require("./share");

var _share2 = _interopRequireDefault(_share);

var _comingsoon = require("./comingsoon");

var _comingsoon2 = _interopRequireDefault(_comingsoon);

var _search = require("./search");

var _search2 = _interopRequireDefault(_search);

var _filters = require("./filters");

var _filters2 = _interopRequireDefault(_filters);

var _responsive = require("./responsive");

var _responsive2 = _interopRequireDefault(_responsive);

var _effects = require("redux-saga/effects");

var _reduxBindings = require("./redux-bindings");

var _utilities = require("./utilities");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// addSaga(function* dataSync(getState) {
//
//   console.log(take, put, getState())
//   yield setTimeout(() => (console.log("done")), 1000)
//
// })

// there is an issue loading jsx from a js file
exports.campuses = _campuses2["default"];
exports.liked = _liked2["default"];
exports.modal = _modal2["default"];
exports.nav = _nav2["default"];
exports.accounts = _accounts2["default"];
exports.sections = _sections2["default"];
exports.topics = _topics2["default"];
exports.collections = _collections2["default"];
exports.share = _share2["default"];
exports.comingsoon = _comingsoon2["default"];
exports.routing = _routing2["default"];
exports.search = _search2["default"];
exports.filters = _filters2["default"];
exports.responsive = _responsive2["default"];
exports.wrapper = _reduxBindings.wrapper;
exports.createReduxStore = _reduxBindings.createReduxStore;
exports.addMiddleware = _utilities.addMiddleware;
exports.addReducer = _utilities.addReducer;
exports.createReducer = _utilities.createReducer;
exports.addSaga = _utilities.addSaga;
exports.take = _effects.take;
exports.put = _effects.put;
exports.fork = _effects.fork;
exports.call = _effects.call;
exports.join = _effects.join;
exports.cancel = _effects.cancel;