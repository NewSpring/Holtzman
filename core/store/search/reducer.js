/*

  Search store

*/

import { createReducer } from "../utilities"

const initial = {
  items: []
}

export default createReducer(initial, {

  ["SEARCH.ADD"](state, action) {
    return {...state,
      items: [ ...state.items, ...action.items ]
    }
  },

  ["SEARCH.CLEAR"](state, action) {
    return {...state,
      items: []
    }
  }

});
