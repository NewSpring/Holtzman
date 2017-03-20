/*

  Navigation store

*/

import modalActions from "../modal";
import shareActions from "../share";
import Sections from "../../../components/shared/sections";
import Discover from "../../../components/discover";

import { routeActions } from "../routing";

let sectionsVisible = false;
let discoverVisible = false;

const back = () => routeActions.goBack();
const profileLink = process.env.NATIVE ? "/profile" : "/profile/settings";

const sectionsAction = () => {
  if (process.env.NATIVE) return routeActions.push("/sections");

  discoverVisible = false;
  sectionsVisible = true;
  return modalActions.render(Sections, { keepNav: true });
};

const discoverAction = () => {
  if (process.env.NATIVE) return routeActions.push("/discover");

  sectionsVisible = false;
  discoverVisible = true;
  return modalActions.render(Discover, {
    keepNav: true, layoutOverride: ["background--light-secondary"],
  });
};

const sectionsActive = ({ path, modal }) => {
  if (process.env.NATIVE) return path === "/sections";
  return sectionsVisible && modal.visible;
};

const discoverActive = ({ path, modal }) => {
  if (process.env.NATIVE) return path === "/discover";
  return discoverVisible && modal.visible;
};

let homeLink = "/";
if (process.env.WEB) homeLink = "/give/now";
let links = {
  TOP: [
    {
      id: 1,
      label: "Home",
      link: homeLink,
      icon: "icon-logo",
      isActive: ({ path, modal }) => (path === homeLink && !modal.visible),
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
      label: "Groups",
      link: "/groups/finder",
      icon: "icon-groups",
      isActive: ({ path, modal }) => (path.indexOf("/groups") === 0 && !modal.visible),
    },
    {
      id: 4,
      label: "Discover",
      action: discoverAction,
      icon: "icon-search",
      isActive: discoverActive,
    },
    {
      id: 5,
      label: "Profile",
      link: profileLink,
      icon: "icon-profile",
      isActive: ({ path, modal }) => (path === profileLink && !modal.visible),
    },
  ],
  CONTENT: [
    { id: 1, action: back, icon: "icon-arrow-back" },
    // { id: 2, action: showSections, icon:"icon-sections" },
    {
      id: 2,
      action: false,
      icon: "icon-like",
      activeIcon: "icon-like-solid",
      isActive: (props) => props.liked,
    },
    { id: 3, action: shareActions.share, icon: "icon-share" },
  ],
  BASIC_CONTENT: [
    { id: 1, action: back, icon: "icon-arrow-back" },
  ],
  MODAL: [
    { id: 1, action: modalActions.hide, icon: "icon-close" },
  ],
  DOWN: [
    { id: 1, action: modalActions.hide, icon: "icon-arrow-down" },
  ],
};

// use basic nav for web right now
if (process.env.WEB) {
  links = {
    TOP: links.TOP,
    CONTENT: links.TOP,
    BASIC_CONTENT: links.TOP,
    MODAL: links.MODAL,
    DOWN: links.DOWN,
  };
}


const initial = {
  level: "TOP",
  visible: true,
  links: links.TOP,
  bgColor: "#202020",
  fgColor: "dark",
  // bgColor: "#e7e7e7",
  // fgColor: "light",
};

export default function nav(state = initial, action) {
  switch (action.type) {
    case "NAV.SET_LEVEL":
      return {
        ...state,
        ...{
          level: action.level,
          links: links[action.level],
          bgColor: action.bgColor || initial.bgColor,
          fgColor: action.fgColor || initial.fgColor,
        },
      };
    case "NAV.SET_LINKS":
      return {
        ...state,
        ...{
          links: [...state.links, ...action.links],
        },
      };
    case "NAV.SET_COLOR":
      return {
        ...state,
        ...{
          bgColor: action.bgColor,
          fgColor: action.fgColor,
        },
      };
    case "NAV.RESET_COLOR":
      return {
        ...state,
        ...{
          bgColor: initial.bgColor,
          fgColor: initial.fgColor,
        },
      };
    case "NAV.SET_ACTION": // eslint-disable-line no-case-declarations
      const newLinks = [
        ...state.links.slice(0, action.props.id - 1),
        {
          ...state.links[action.props.id - 1],
          action: action.props.action,
        },
        ...state.links.slice(action.props.id),
      ];

      if (links[action.level]) {
        links[action.level] = newLinks;
      }

      return {
        ...state,
        ...{
          links: newLinks,
        },
      };
    case "NAV.SET_VISIBILITY":
      return {
        ...state,
        ...{
          visible: action.visible,
        },
      };
    default:
      return state;
  }
}
