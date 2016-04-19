/*

  Liked store

*/

import { createReducer } from "../utilities"

const initial = {
  likes: []
}

export default createReducer(initial, {

  ["LIKED.TOGGLE"](state, action) {
    const entryId = action.props.entryId;
    const previousLikes = state.likes;
    const nextLikes = _.contains(previousLikes, entryId) ?
      _.without(previousLikes, entryId) :
      _.union(previousLikes, [entryId]);

    return {...state,
      likes: nextLikes
    }
  },

  ["LIKED.SET"](state, action) {
    return {...state,
      likes: action.content
    }
  }

});
