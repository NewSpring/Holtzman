import { reducers, addReducer, createReducer } from "./utilities"

import modal from "./modal/"
import nav from "./nav"
import onBoard from "./on-board"
import sections from "./sections"
import liked from "./liked"


addReducer({
  modal,
  nav,
  onBoard,
  sections,
  liked
})


export default {
  addReducer,
  createReducer,
  reducers
}
