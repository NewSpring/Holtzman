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

    // this isnt truly stateless
    // should we move this logic to a thunk or a saga?
    if (!state[action.collection]) {
      state[action.collection] = {
        __raw,
        collection: new Mongo.Collection(null)
      }
    }


    // not stateless because I don't think we can copy / merge Mongo Collections
    for (let item of action.data) {
      state[action.collection].collection.upsert({
        __redux_id__: item[action.key]
      }, { $set: item })
    }

    state[action.collection].__raw = {...state[action.collection].__raw, ...__raw}

    return state

  }


})

addReducer({
  collections: reducer
})
