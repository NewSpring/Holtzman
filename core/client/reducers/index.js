import { combineReducers } from "redux"
import { reducers, addReducer, createReducer } from "./utilities"

import modal from "./modal/"
import nav from "./nav"
import onBoard from "./on-board"
import sections from "./sections"


addReducer({
  modal,
  nav,
  onBoard,
  sections
})


export default {
  addReducer,
  createReducer,
  reducers
}
