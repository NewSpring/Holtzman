import { combineReducers } from "redux"

// stored state for use with other packages
const reducers = {}
import Error from "../../lib/error"

const addReducer = (name, handler) => {

  if (reducers[name]) {
    throw new Error(
      "Reducer assigned",
      `reducers function ${name} is already registered`
    )
  }

  if (!handler || typeof(handler) != "function") {
    throw new Error(
      "Reducer TypeError",
      `Reducer ${name} requires a function`
    )
  }

  reducers[name] = handler
  return
}

const createReducer = (initialState, handlers) => {

  return (state = initialState, action) => {
    // better than switch statement
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action)
    } else {
      return state
    }
  }

}


import nav from "./nav"


addReducer("nav", nav)


export default {
  addReducer,
  createReducer,
  reducers
}
