import { addReducer, createReducer } from "../utilities"

const reducer = createReducer({}, {

  ["@@collections/INSERT"](state, action) {

    return {...state, ...{
      [action.collection]: {...state[action.collection], ...action.data}
    }}

  },

  ["@@collections/REMOVE"](state, action) {

  }

})

addReducer({
  collections: reducer
})
