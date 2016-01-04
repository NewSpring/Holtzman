/*


  Navigation action types

  NAV.SET_LEVEL
    "TOP" // home, sections, discover, profile
    "CONTENT" // back, like, share
    "MODAL" // down, like, share

  NAV.SET_LINKS
    // experimental

  NAV.SET_VISIBILITY
    hide or show the nav from the page


*/

"use strict";

exports.__esModule = true;
exports["default"] = {
  setLevel: function setLevel(level) {
    return { type: "NAV.SET_LEVEL", level: level };
  },
  reset: function reset() {
    return { type: "NAV.SET_LEVEL", level: "TOP" };
  },

  setLinks: function setLinks(links) {
    return { type: "NAV.SET_LINKS", links: links };
  },

  hide: function hide() {
    return { type: "NAV.SET_VISIBILITY", visible: false };
  },
  show: function show() {
    return { type: "NAV.SET_VISIBILITY", visible: true };
  }
};
module.exports = exports["default"];