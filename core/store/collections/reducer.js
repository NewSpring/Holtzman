import { addReducer, createReducer } from "../utilities"
import types from "./types"

const reducer = createReducer({}, {

  [types.INSERT](state, action) {

    return {...state, ...{
      [action.collection]: {...state[action.collection], ...action.data}
    }}

  },
  [types.MONGO_INSERT_BATCH](state, action) {

    let __raw = {}
    for (let entry of action.data) {
      __raw[entry[action.key]] = entry
    }

    return {...state, ...{
      [action.collection]: {...state[action.collection], ...__raw}
    }}

  }


})

addReducer({
  collections: reducer
})
