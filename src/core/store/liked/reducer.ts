/*

  Liked store

*/
import { assign, includes, without, union } from "lodash";
import { State, createReducer } from "../utilities";

export interface Likes {
  likes: Array<any>;
};

const initial: Likes = {
  likes: []
};

export default createReducer(initial, {

  ["LIKED.TOGGLE"]: (state: Likes, action: any): Likes => {
    const entryId = action.props.entryId;
    const previousLikes = state.likes;
    const nextLikes = includes(previousLikes, entryId) ?
      without(previousLikes, entryId) :
      union(previousLikes, [entryId]);

    return assign( state, { likes: nextLikes }) as Likes;
  },

  ["LIKED.SET"]: (state: Likes, action: any): Likes => {
    return assign(state, { likes: action.content }) as Likes;
  }

});
