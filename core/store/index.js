import "regenerator/runtime"

import liked from "./liked"
import modal from "./modal"
import nav from "./nav"
import onBoard from "./onBoard"
import sections from "./sections"
import topics from "./topics"

import {
  join,
  fork,
  call,
  take,
  put,
  cancel,
  SagaCancellationException
} from "redux-saga"


// addSaga(() => function* dataSync(getState) {
//
//   console.log(take, put, getState())
//   yield setTimeout(() => (console.log("done")), 1000)
//
// })

import { Wrapper, createReduxStore } from "./redux-bindings"
import { addMiddleware, addReducer, createReducer, addSaga } from "./utilities"

export {
  liked,
  modal,
  nav,
  onBoard,
  sections,
  Wrapper,
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
  SagaCancellationException
}
