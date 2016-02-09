import { addReducer, createReducer } from "../utilities"
import types from "./types"

const reducer = createReducer({}, {

  [types.INSERT](state, action) {

    return {...state, ...{
      [action.collection]: {...state[action.collection], ...action.data}
    }}

  }

})

addReducer({
  collections: reducer
})
