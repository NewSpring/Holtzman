
import _ from "lodash.assign"
import { createReducer, addReducer } from "../../../core/store/utilities"

import types from "./types"

const initial = {
  visible: false,
  state: "default", // "full"
}

const reducer = createReducer(initial, {

  [types.INSERT](state, action) {

    return _.assign(
      state, 
      { 
        [action.collection]: 
          _.assign(
            state[action.collection], 
            action.data
          ) 
      }
    );

  }

})

addReducer({
  map: reducer
})
