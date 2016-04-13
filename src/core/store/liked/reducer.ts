/*

  Liked store

*/
import { assign, includes, without, union } from "lodash";
import { State, createReducer } from "../utilities";

export interface LikedState {
  likes: Array<any>;
};

const initial: LikedState = {
  likes: []
};

export default createReducer(initial, {

  ["LIKED.TOGGLE"]: (state: LikedState, action: any): LikedState => {
    const entryId = action.props.entryId;
    const previousLikes = state.likes;
    const nextLikes = includes(previousLikes, entryId) ?
      without(previousLikes, entryId) :
      union(previousLikes, [entryId]);

    return assign( state, { likes: nextLikes }) as LikedState;
  },

  ["LIKED.SET"]: (state: LikedState, action: any): LikedState => {
    return assign(state, { likes: action.content }) as LikedState;
  }

});
