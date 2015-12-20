import { combineReducers } from "redux"
import { reducers, addReducer, createReducer } from "./utilities"

import modal from "./modal/"
import nav from "./nav"
import onBoard from "./on-board"


addReducer({
  modal,
  nav,
  onBoard
})


export default {
  addReducer,
  createReducer,
  reducers
}
