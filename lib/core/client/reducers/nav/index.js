/*

  Navigation store

*/
"use strict";

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports["default"] = nav;

var _reduxSimpleRouter = require("redux-simple-router");

var _actions = require("../../actions/");

var _blocks = require("../../blocks");

var back = function back(props) {
  // return goBack()
  // console.log(pushPath("/"))
  // return pushPath("/")
  // return {
  //   type: "@@router/TRANSITION",
  //   payload: {
  //     method: "goBack",
  //     arg: undefined
  //   }
  // }
  window.history.back();
  return {
    type: "FALSY",
    payload: {}
  };
};

// const goHome = (props) => {
//   // return go("/")
//
//   const { dispatch } = props
//   dispatch(modalActions.hide())
//   // return {}
//   return pushPath("/")
// }

var showSections = function showSections(props) {
  return _actions.modal.render(_blocks.Sections, { keepNav: true });
};

var links = {
  TOP: [{ id: 1, label: "Home", link: "/", icon: "icon-logo" }, { id: 2, label: "Sections", action: showSections, icon: "icon-sections" }, { id: 3, label: "Discover", link: "/discover", icon: "icon-search" }, { id: 4, label: "Profile", link: "/profile", icon: "icon-profile" }],
  CONTENT: [{ id: 1, action: back, icon: "icon-arrow-back" }, { id: 2, action: showSections, icon: "icon-sections" }, { id: 2, action: false, icon: "icon-like" }, { id: 3, action: false, icon: "icon-share" }],
  MODAL: [{ id: 1, action: _actions.modal.hide, icon: "icon-close" }]
};

var initial = { level: "TOP", visible: true, links: links.TOP };

function nav(state, action) {
  if (state === undefined) state = initial;

  switch (action.type) {
    case "NAV.SET_LEVEL":
      return _extends({}, state, {
        level: action.level,
        links: links[action.level]
      });
    case "NAV.SET_LINKS":
      return _extends({}, state, {
        links: [].concat(state.links, action.links)
      });
    case "NAV.SET_VISIBILITY":
      return _extends({}, state, {
        visible: action.visible });
    default:
      return state;
  }
}

module.exports = exports["default"];