/*

  Liked store

*/

import { createReducer } from "../utilities"

const initial = {
  likes: []
}

export default createReducer(initial, {

  ["LIKED.TOGGLE_LIKE"](state, action) {
    return {...state,
      likes: [
        ...state.likes,
        action.props
      ]
    }
  }

});
