/*

  Navigation store

*/
import { assign } from "lodash";

import modalActions from "../modal";
import likedActions from "../liked";
import shareActions from "../share";

import { State, createReducer } from "../utilities";
import Sections from "../../blocks/sections";
import Discover from "../../blocks/discover";

import { routeActions } from "../routing";

let sectionsVisible = false;
let discoverVisible = false;

const back = () => {
  return routeActions.goBack();
}

const isEqual = (path: string) => {
  if (typeof window != "undefined" && window != null) {
    return window.location.pathname === path
  }

  return false
}

const profileLink = Meteor.isCordova ? "/profile" : "/profile/settings"

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
      action: (props) => {
        const { modal, dispatch } = props
        discoverVisible = false
        sectionsVisible = true
        return modalActions.render(Sections, { keepNav: true })
      },
      icon: "icon-sections",
      isActive: (props) => (sectionsVisible && props.modal.visible)
    },
    {
      id: 3,
      label:"Discover",
      action: (props) => {
        const { modal, dispatch } = props
        sectionsVisible = false
        discoverVisible = true
        return modalActions.render(Discover, { keepNav: true, layoutOverride: ["background--light-secondary"] })
      },
      icon:"icon-search",
      isActive: (props) => (discoverVisible && props.modal.visible)
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
  ]
}

// use basic nav for web right now
if (!Meteor.isCordova) {
  links = {
    TOP: links.TOP,
    CONTENT: links.TOP,
    BASIC_CONTENT: links.TOP,
    MODAL: links.MODAL
  }
}

export interface NavState {
  level: string;
  visible: boolean;
  links: Array<any>;
}

const initial: NavState = { level: "TOP", visible: true, links: links.TOP}

export default createReducer(initial, {
  ["NAV.SET_LEVEL"]: ( state: NavState, action: any): NavState => {
    return assign( state, { level: action.level, links: links[action.level]}) as NavState;
  },
  ["NAV.SET_LINKS"]: ( state: NavState, action: any): NavState => {
    return assign( state, { links: [ assign(state.links, action.links)]}) as NavState;
  },
  ["NAV.SET_ACTION"]: ( state: NavState, action: any): NavState => {

      let newLinks = [];

      newLinks.concat(state.links.slice(0, action.props.id - 1));
      newLinks.push(assign({}, state.links[action.props.id - 1], { action: action.props.action }));
      newLinks.concat(state.links.slice(action.props.id));

      if (links[action.level]) {
        links[action.level] = newLinks
      }

      return assign({}, state, { links: newLinks }) as NavState;
  },
  ["NAV.SET_VISIBILITY"]: (state: NavState, action: any): NavState => {
    return assign(state, { visible: action.visible }) as NavState;
  }
});

