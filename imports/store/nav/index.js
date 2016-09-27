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
import reducer from "./reducer";
import { addReducer } from "../utilities";

addReducer({
  nav: reducer,
});

export default {
  reducer,

  setLevel: level => ({ type: "NAV.SET_LEVEL", level }),
  reset: () => ({ type: "NAV.SET_LEVEL", level: "TOP" }),

  setColor: (bgColor, fgColor) => ({ type: "NAV.SET_COLOR", bgColor, fgColor }),

  setLinks: links => ({ type: "NAV.SET_LINKS", links }),
  setAction: (level, props) => ({ type: "NAV.SET_ACTION", level, props }),

  hide: () => ({ type: "NAV.SET_VISIBILITY", visible: false }),
  show: () => ({ type: "NAV.SET_VISIBILITY", visible: true }),
};
