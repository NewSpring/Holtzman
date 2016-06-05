
import { createReducer, addReducer } from "../../../core/store/utilities"

import types from "./types"

const initial = {
  visible: false,
  state: "default", // "full"
}

const reducer = createReducer(initial, {

  [types.INSERT](state, action) {

    return {...state, ...{
      [action.collection]: {...state[action.collection], ...action.data}
    }}

  }

})

addReducer({
  map: reducer
})
