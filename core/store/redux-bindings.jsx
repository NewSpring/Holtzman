import "regenerator/runtime"

import { Component, PropTypes} from "react"
import { createStore, combineReducers, compose, applyMiddleware } from "redux"
import { syncHistory, routeReducer } from "react-router-redux"
import { Provider } from "react-redux"
import thunk from "redux-thunk"
import sagaMiddleware from "redux-saga"


import { Global } from "../blocks"
import { reducers, middlewares, sagas } from "./utilities"

const createReduxStore = (initialState, history) => {

  const joinedReducers = {...reducers, ...{
    routing: routeReducer
  }}

  let convertedSagas = sagas.map((saga) => (saga()))

  let sharedMiddlewares = [...[
    thunk
  ], ...middlewares]

  const reduxRouterMiddleware = syncHistory(history)
  let sharedCompose = [
    applyMiddleware(
      ...sharedMiddlewares,
      sagaMiddleware(...convertedSagas),
      reduxRouterMiddleware
    ),
  ]


  if (process.env.NODE_ENV != "production") {
    sharedCompose = [...sharedCompose, ...[
      typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f
    ]]

  }

  const store = compose(...sharedCompose)(createStore)(combineReducers(joinedReducers), initialState)

  return store

}


const wrapper = Provider
export {
  wrapper,
  createReduxStore
}
