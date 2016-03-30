"use strict";

exports.__esModule = true;

var _reducer = require("./reducer");

var _reducer2 = _interopRequireDefault(_reducer);

var _utilities = require("../utilities");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/*


  Navigation action types

  NAV.SET_LEVEL
    "TOP" // home, sections, discover, profile
    "CONTENT" // back, like, share
    "MODAL" // down, like, share

  NAV.SET_LINKS
    // experimental

  NAV.SET_ACTION
    props: {
      id: id of link
      action: function
    }

  NAV.SET_VISIBILITY
    hide or show the nav from the page

  NAV.SET_ACTIVE
    set the active link


*/


(0, _utilities.addReducer)({
  nav: _reducer2["default"]
});

exports["default"] = {
  reducer: _reducer2["default"],

  setLevel: function setLevel(level) {
    return { type: "NAV.SET_LEVEL", level: level };
  },
  reset: function reset() {
    return { type: "NAV.SET_LEVEL", level: "TOP" };
  },

  setLinks: function setLinks(links) {
    return { type: "NAV.SET_LINKS", links: links };
  },
  setAction: function setAction(level, props) {
    return { type: "NAV.SET_ACTION", level: level, props: props };
  },

  hide: function hide() {
    return { type: "NAV.SET_VISIBILITY", visible: false };
  },
  show: function show() {
    return { type: "NAV.SET_VISIBILITY", visible: true };
  }
};
module.exports = exports['default'];