/*

  Coming soon store

*/

import { createReducer } from "../utilities"

const initial = {
  active: false
};

export default createReducer(initial, {

  ["COMINGSOON.TOGGLE"](state, action) {
    return {...state,
      active: !state.active
    }
  }

});
