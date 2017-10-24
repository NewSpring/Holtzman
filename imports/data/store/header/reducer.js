/*
  Shared store
*/

import { createReducer } from "../utilities";

const brand = "#6BAC43";
const initial = {
  visible: true,
  statusBar: true,
  lockHolder: null,
  content: {
    title: "NewSpring",
    subTitle: "",
    color: brand,
    light: true,
    isSearch: false,
    showSettings: false,
    searchSubmit: false,
  },
};

export default createReducer(initial, {

  "HEADER.LOCK": (state, action) => {
    if (state.lockHolder) {
      return state;
    }

    const newState = { ...state };
    newState.lockHolder = action.requestee;
    return newState;
  },

  "HEADER.UNLOCK": state => {
    if (!state.lockHolder) {
      return state;
    }

    const newState = { ...state };
    newState.lockHolder = null;
    return newState;
  },

  "HEADER.SET": (state, action) => {
    if (state.lockHolder && action.requestee !== state.lockHolder) {
      return state;
    }

    const mergedContent = { ...initial.content, ...action.content };

    if (mergedContent.color.indexOf("#") !== 0 && mergedContent.color !== "transparent") {
      mergedContent.color = `#${mergedContent.color}`;
    }

    const newState = { ...state,
      content: { ...state.content, ...mergedContent },
    };

    if (mergedContent.title || mergedContent.isSearch) {
      newState.visible = true;
    }

    return newState;
  },

  "HEADER.TOGGLE_VISIBILITY": (state, action) => (
    { ...state,
      visible: action.visible,
      // do type check since statusBar is a boolean value
      statusBar: typeof action.statusBar === "undefined" ? initial.statusBar : action.statusBar,
    }
  ),

});
