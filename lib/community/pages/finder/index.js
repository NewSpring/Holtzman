"use strict";

exports.__esModule = true;

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _dec, _class;
// import { Map } from "../../../core/components"

var _react = require("react");

var _reactRedux = require("react-redux");

var _graphql = require("../../../core/graphql");

var _encode = require("../../../core/util/encode");

var _routing = require("../../../core/store/routing");

var _Search = require("./Search");

var _Search2 = _interopRequireDefault(_Search);

var _Results = require("./Results");

var _Results2 = _interopRequireDefault(_Results);

var _List = require("./Results/List");

var _List2 = _interopRequireDefault(_List);

var _Profile = require("./Results/Profile");

var _Profile2 = _interopRequireDefault(_Profile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// const map = (state) => ({ person: state.accounts.person })
var Template = (_dec = (0, _reactRedux.connect)(), _dec(_class = function (_Component) {
  (0, _inherits3["default"])(Template, _Component);

  function Template() {
    var _temp, _this, _ret;

    (0, _classCallCheck3["default"])(this, Template);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3["default"])(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.state = {
      mapsReady: false
    }, _this.mapsLoadedCallbacks = [], _this.onGoogleLoaded = function (method) {

      // restrict actions to client side loading only
      if (typeof window === "undefined" || window === null) {
        return;
      }

      // if google is already loaded
      if (window.google && window.google.maps) {
        return method(window.google.maps);
      }

      _this.mapsLoadedCallbacks.push(method);
    }, _this.search = function (query) {
      var hash = encodeURI((0, _encode.base64Encode)(JSON.stringify(query)));
      _this.props.dispatch(_routing.routeActions.push("/groups/finder/list/" + hash));
    }, _temp), (0, _possibleConstructorReturn3["default"])(_this, _ret);
  }

  Template.prototype.componentDidMount = function componentDidMount() {
    var _this2 = this;

    // restrict actions to client side loading only
    if (typeof window === "undefined" || window === null) {
      return;
    }

    // if google is already loaded
    if (window.google && window.google.maps) {
      return;
    }

    window.__mapsLoaded__ = function () {
      delete window.__mapsLoaded__;

      _this2.service = new window.google.maps.DistanceMatrixService();
      _this2.geocoder = new window.google.maps.Geocoder();
      _this2.setState({ mapsReady: true });
      for (var _iterator = _this2.mapsLoadedCallbacks, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
        var _ref;

        if (_isArray) {
          if (_i >= _iterator.length) break;
          _ref = _iterator[_i++];
        } else {
          _i = _iterator.next();
          if (_i.done) break;
          _ref = _i.value;
        }

        var method = _ref;

        method(window.google.maps);
      }
    };

    var script = document.createElement("script");
    script.src = "https://maps.googleapis.com/maps/api/js?callback=__mapsLoaded__";
    document.body.appendChild(script);
  };

  Template.prototype.render = function render() {
    var _this3 = this;

    var sugaredChildren = React.Children.map(this.props.children, function (x) {
      return React.cloneElement(x, {
        onLoaded: _this3.onGoogleLoaded,
        geocoder: _this3.geocoder,
        service: _this3.service,
        search: _this3.search
      });
    });

    return React.createElement(
      "div",
      null,
      sugaredChildren
    );
  };

  return Template;
}(_react.Component)) || _class);


var Routes = [{
  path: "finder",
  component: Template,
  indexRoute: {
    component: _Search2["default"]
  },
  childRoutes: [{
    path: "list",
    component: _Results2["default"],
    indexRoute: {
      component: _List2["default"]
    },
    childRoutes: [{ path: ":hash", component: _List2["default"] }, { path: ":hash/:groupId", component: _Profile2["default"] }]
  }]
}];

exports["default"] = {
  Template: Template,
  Routes: Routes
};
module.exports = exports['default'];