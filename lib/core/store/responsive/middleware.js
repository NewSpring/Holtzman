"use strict";

var _utilities = require("../utilities");

var _debounce = require("../../util/debounce");

var _debounce2 = _interopRequireDefault(_debounce);

var _actions = require("./actions");

var _actions2 = _interopRequireDefault(_actions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var bound = false;
var responsiveBindings = function responsiveBindings(store) {
  return function (next) {
    return function (action) {

      if (bound) {
        return next(action);
      }
      bound = true;

      // XXX figure out how to get width on the server
      if (typeof window === "undefined" || window === null) {
        return;
      }

      var dispatch = store.dispatch;
      var getState = store.getState;


      var getBreakpoints = function getBreakpoints(width) {
        var _getState = getState();

        var responsive = _getState.responsive;


        var breakpoints = [];
        for (var breakpoint in responsive._breakpoints) {
          var name = breakpoint;
          var range = responsive._breakpoints[breakpoint];

          if (range.min && width < range.min) {
            continue;
          }

          if (range.max && width > range.max) {
            continue;
          }

          breakpoints.push(name);
        }

        return breakpoints;
      };

      var onBodyResize = function onBodyResize() {
        console.log("here");

        var _getState2 = getState();

        var responsive = _getState2.responsive;


        var w = window,
            d = document,
            e = d.documentElement,
            g = d.getElementsByTagName("body")[0],
            x = w.innerWidth || e.clientWidth || g.clientWidth,
            y = w.innerHeight || e.clientHeight || g.clientHeight;

        dispatch(_actions2["default"].setWidth(x));
        dispatch(_actions2["default"].setHeight(y));

        var breakpoints = getBreakpoints(x);

        if (!_.difference(responsive.breakpoints, breakpoints).length) {
          dispatch(_actions2["default"].setBreakpoints(breakpoints));
        }
      };

      var deboncedResize = new _debounce2["default"](onBodyResize);

      // this is a single run through since we are using a debounced
      // method to bind to the window's events
      window.addEventListener("resize", deboncedResize, false);

      return next(action);
    };
  };
};

(0, _utilities.addMiddleware)(responsiveBindings);