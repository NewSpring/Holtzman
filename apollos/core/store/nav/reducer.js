/*

  Navigation store

*/

import modalActions from "../modal"
import likedActions from "../liked"
import shareActions from "../share"
import Sections from "../../blocks/sections"
import Discover from "../../blocks/discover"

import { routeActions } from "../routing"

let sectionsVisible = false
let discoverVisible = false

const back = () => {
  return routeActions.goBack()
}

const isEqual = (path) => {
  if (typeof window != "undefined" && window != null) {
    return window.location.pathname === path
  }

  return false
}

const profileLink = Meteor.isCordova ? "/profile" : "/profile/settings"

const sectionsAction = (props) => {
  const { modal, dispatch } = props

  if (Meteor.isCordova) {
    return routeActions.push("/sections");
  } else {
    discoverVisible = false
    sectionsVisible = true
    return modalActions.render(Sections, { keepNav: true })
  }
};

const discoverAction = (props) => {
  const { modal, dispatch } = props;

  if (Meteor.isCordova) {
    return routeActions.push("/discover");
  } else {
    sectionsVisible = false;
    discoverVisible = true;
    return modalActions.render(Discover, {
      keepNav: true, layoutOverride: ["background--light-secondary"]
    });
  }
};

const sectionsActive = (props) => {
  if (Meteor.isCordova) {
    return isEqual("/sections");
  } else {
    return sectionsVisible && props.modal.visible;
  }
};

const discoverActive = (props) => {
  if (Meteor.isCordova) {
    return isEqual("/discover");
  } else {
    return discoverVisible && props.modal.visible
  }
};

let links = {
  TOP:[
    {
      id: 1,
      label: "Home",
      link: "/",
      icon: "icon-logo",
      isActive: (props) => (isEqual("/") && !props.modal.visible)
    },
    {
      id: 2,
      label: "Sections",
      action: sectionsAction,
      icon: "icon-sections",
      isActive: sectionsActive,
    },
    {
      id: 3,
      label:"Discover",
      action: discoverAction,
      icon:"icon-search",
      isActive: discoverActive,
    },
    {
      id: 4,
      label: "Profile",
      link: profileLink,
      icon: "icon-profile",
      isActive: (props) => (isEqual(profileLink) && !props.modal.visible)
    }
  ],
  CONTENT: [
    { id: 1, action: back, icon:"icon-arrow-back" },
    // { id: 2, action: showSections, icon:"icon-sections" },
    { id: 2, action: false, icon:"icon-like", isActive: (props) => props.liked },
    { id: 3, action: shareActions.share, icon:"icon-share" }
  ],
  BASIC_CONTENT: [
    { id: 1, action: back, icon:"icon-arrow-back" }
  ],
  MODAL: [
    { id: 1, action: modalActions.hide, icon:"icon-close" }
  ],
  DOWN: [
    { id: 1, action: modalActions.hide, icon:"icon-arrow-down"}
  ]
}

// use basic nav for web right now
if (!Meteor.isCordova) {
  links = {
    TOP: links.TOP,
    CONTENT: links.TOP,
    BASIC_CONTENT: links.TOP,
    MODAL: links.MODAL,
    DOWN: links.DOWN
  }
}


const initial = {
  level: "TOP",
  visible: true,
  links: links.TOP,
  bgColor: "#202020",
  fgColor: "light",
};

export default function nav(state = initial, action) {

  switch (action.type) {
    case "NAV.SET_LEVEL":
      return { ...state, ...{
        level: action.level,
        links: links[action.level],
        bgColor: action.bgColor || initial.bgColor,
        fgColor: action.fgColor || initial.fgColor,
      } }
    case "NAV.SET_LINKS":
      return { ...state, ...{
        links: [ ...state.links, ...action.links ]
      } }
    case "NAV.SET_COLOR":
      return { ...state, ...{
        bgColor: action.bgColor,
        fgColor: action.fgColor,
      } }
    case "NAV.RESET_COLOR":
      return { ...state, ...{
        bgColor: initial.bgColor,
        fgColor: initial.fgColor,
      } }
    case "NAV.SET_ACTION":

      let newLinks = [
        ...state.links.slice(0, action.props.id - 1),
        {
          ...state.links[action.props.id - 1],
          action: action.props.action,
        },
        ...state.links.slice(action.props.id)
      ]

      if (links[action.level]) {
        links[action.level] = newLinks
      }

      return { ...state, ...{
        links: newLinks
      } }
    case "NAV.SET_VISIBILITY":
      return { ...state, ...{
        visible: action.visible }
      }
    default:
      return state
  }
}
