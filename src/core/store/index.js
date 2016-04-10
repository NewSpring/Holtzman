import "regenerator/runtime"

import liked from "./liked"
import modal from "./modal"
import nav from "./nav"
import accounts from "./accounts"
import sections from "./sections"
import topics from "./topics"
import campuses from "./campuses"
import collections from "./collections"
import routing from "./routing"
import share from "./share"
import comingsoon from "./comingsoon"
import search from "./search"
import filters from "./filters"
import responsive from "./responsive"

import {
  join,
  fork,
  call,
  take,
  put,
  cancel,
} from "redux-saga/effects"


// addSaga(function* dataSync(getState) {
//
//   console.log(take, put, getState())
//   yield setTimeout(() => (console.log("done")), 1000)
//
// })

// there is an issue loading jsx from a js file
import { wrapper, createReduxStore } from "./redux-bindings.jsx"
import { addMiddleware, addReducer, createReducer, addSaga } from "./utilities"

export {
  campuses,
  liked,
  modal,
  nav,
  accounts,
  sections,
  topics,
  collections,
  share,
  comingsoon,
  routing,
  search,
  filters,
  responsive,

  wrapper,
  createReduxStore,

  addMiddleware,

  addReducer,
  createReducer,

  addSaga,
  take,
  put,
  fork,
  call,
  join,
  cancel,
}
