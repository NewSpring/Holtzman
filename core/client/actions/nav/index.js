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

  NAV.SET_ACTIVE
    set the active link


*/


export default {
  setLevel: (level) => ({ type: "NAV.SET_LEVEL", level }),
  reset: () => ({ type: "NAV.SET_LEVEL", level: "TOP" }),

  setLinks: (links) => ({ type: "NAV.SET_LINKS", links }),

  hide: () => ({ type: "NAV.SET_VISIBILITY", visible: false }),
  show: () => ({ type: "NAV.SET_VISIBILITY", visible: true })
}
