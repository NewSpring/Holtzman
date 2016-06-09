/*
  Shared store
*/

import { createReducer } from "apollos/core/store/utilities"

let brand = "#6BAC43"
const initial = {
  visible: true,
  statusBar: true,
  content: {
    title: "default",
    subTitle: "none",
    color: brand,
    light: true,
  },
};

export default createReducer(initial, {

  ["HEADER.SET"](state, action) {
    if (!action.content.color) {
      action.content.color = brand;
    }
    else if(action.content.color.indexOf("#") !== 0) {
      action.content.color = "#" + action.content.color;
    }

    if (!action.content.subTitle) {
      action.content.subTitle = initial.subTitle;
    }

    return {...state,
      content: {...state.content, ...action.content}
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
