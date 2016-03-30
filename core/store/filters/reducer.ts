/*

  Filters store

*/

import { createReducer } from "../utilities"

const initial = {
  campus: null
}

export default createReducer(initial, {

  ["FILTERS.SET"](state, action) {
    let newState = { ...state };
    newState[action.content.filter] = action.content.value;
    return newState
  }

});
