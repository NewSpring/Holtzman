/*
  Shared store
*/

import { createReducer } from "apollos/core/store/utilities"

let brand = "#6BAC43"
const initial = {
  visible: true,
  content: {
    title: "default",
    color: brand,
    light: true,
  },
};

export default createReducer(initial, {

  ["HEADER.SET"](state, action) {
    if (!action.content.color) {
      action.content.color = brand;
    }

    return {...state,
      content: {...state.content, ...action.content}
    }
  },

  ["HEADER.TOGGLE_VISIBILITY"](state, action) {
    return {...state,
      visible: action.visible
    }
  },

});
