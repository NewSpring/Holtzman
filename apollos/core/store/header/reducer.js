/*
  Shared store
*/

import { createReducer } from "apollos/core/store/utilities"

let brand = "#6BAC43"
const initial = {
  visible: true,
  statusBar: true,
  content: {
    title: "NewSpring",
    subTitle: "",
    color: brand,
    light: true,
    isSearch: false,
    searchSubmit: false
  },
};

export default createReducer(initial, {

  ["HEADER.SET"](state, action) {
    const mergedContent = { ...initial.content, ...action.content };
    console.log(action, mergedContent);

    if(mergedContent.color.indexOf("#") !== 0 && mergedContent.color !== "transparent") {
      mergedContent.color = "#" + mergedContent.color;
    }

    console.log(mergedContent);

    return {...state,
      content: { ...state.content, ...mergedContent }
    }
  },

  ["HEADER.TOGGLE_VISIBILITY"](state, action) {
    return {...state,
      visible: action.visible,
      // do type check since statusBar is a boolean value
      statusBar: typeof action.statusBar === "undefined" ? initial.statusBar : action.statusBar,
    }
  },

});
