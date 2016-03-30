"use strict";

exports.__esModule = true;

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

exports["default"] = nav;

var _modal = require("../modal");

var _modal2 = _interopRequireDefault(_modal);

var _liked = require("../liked");

var _liked2 = _interopRequireDefault(_liked);

var _share = require("../share");

var _share2 = _interopRequireDefault(_share);

var _sections = require("../../blocks/sections");

var _sections2 = _interopRequireDefault(_sections);

var _discover = require("../../blocks/discover");

var _discover2 = _interopRequireDefault(_discover);

var _routing = require("../routing");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/*

  Navigation store

*/

var sectionsVisible = false;
var discoverVisible = false;

var back = function back() {
  return _routing.routeActions.goBack();
};

var isEqual = function isEqual(path) {
  if (typeof window != "undefined" && window != null) {
    return window.location.pathname === path;
  }

  return false;
};

var profileLink = Meteor.isCordova ? "/profile" : "/profile/settings";

var links = {
  TOP: [{
    id: 1,
    label: "Home",
    link: "/",
    icon: "icon-logo",
    isActive: function isActive(props) {
      return isEqual("/") && !props.modal.visible;
    }
  }, {
    id: 2,
    label: "Sections",
    action: function action(props) {
      var modal = props.modal;
      var dispatch = props.dispatch;

      discoverVisible = false;
      sectionsVisible = true;
      return _modal2["default"].render(_sections2["default"], { keepNav: true });
    },
    icon: "icon-sections",
    isActive: function isActive(props) {
      return sectionsVisible && props.modal.visible;
    }
  }, {
    id: 3,
    label: "Discover",
    action: function action(props) {
      var modal = props.modal;
      var dispatch = props.dispatch;

      sectionsVisible = false;
      discoverVisible = true;
      return _modal2["default"].render(_discover2["default"], { keepNav: true, layoutOverride: ["background--light-secondary"] });
    },
    icon: "icon-search",
    isActive: function isActive(props) {
      return discoverVisible && props.modal.visible;
    }
  }, {
    id: 4,
    label: "Profile",
    link: profileLink,
    icon: "icon-profile",
    isActive: function isActive(props) {
      return isEqual(profileLink) && !props.modal.visible;
    }
  }],
  CONTENT: [{ id: 1, action: back, icon: "icon-arrow-back" },
  // { id: 2, action: showSections, icon:"icon-sections" },
  { id: 2, action: false, icon: "icon-like", isActive: function isActive(props) {
      return props.liked;
    } }, { id: 3, action: _share2["default"].share, icon: "icon-share" }],
  BASIC_CONTENT: [{ id: 1, action: back, icon: "icon-arrow-back" }],
  MODAL: [{ id: 1, action: _modal2["default"].hide, icon: "icon-close" }]
};

// use basic nav for web right now
if (!Meteor.isCordova) {
  links = {
    TOP: links.TOP,
    CONTENT: links.TOP,
    BASIC_CONTENT: links.TOP,
    MODAL: links.MODAL
  };
}

var initial = { level: "TOP", visible: true, links: links.TOP };

function nav() {
  var state = arguments.length <= 0 || arguments[0] === undefined ? initial : arguments[0];
  var action = arguments[1];


  switch (action.type) {
    case "NAV.SET_LEVEL":
      return (0, _extends3["default"])({}, state, {
        level: action.level,
        links: links[action.level]
      });
    case "NAV.SET_LINKS":
      return (0, _extends3["default"])({}, state, {
        links: [].concat(state.links, action.links)
      });
    case "NAV.SET_ACTION":

      var newLinks = [].concat(state.links.slice(0, action.props.id - 1), [(0, _extends3["default"])({}, state.links[action.props.id - 1], {
        action: action.props.action
      })], state.links.slice(action.props.id));

      if (links[action.level]) {
        links[action.level] = newLinks;
      }

      return (0, _extends3["default"])({}, state, {
        links: newLinks
      });
    case "NAV.SET_VISIBILITY":
      return (0, _extends3["default"])({}, state, {
        visible: action.visible });
    default:
      return state;
  }
}
module.exports = exports['default'];