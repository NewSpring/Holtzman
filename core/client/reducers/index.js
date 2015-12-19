import { combineReducers } from "redux"
import { reducers, addReducer, createReducer } from "./utilities"

import nav from "./nav"
import onBoard from "./on-board"


addReducer({
  nav,
  onBoard
})


export default {
  addReducer,
  createReducer,
  reducers
}
