import "regenerator/runtime"

import { Component, PropTypes} from "react"
import { createStore, combineReducers, compose, applyMiddleware } from "redux"
import { syncReduxAndRouter, routeReducer } from "redux-simple-router"
import { Provider } from "react-redux"
import thunk from "redux-thunk"
import sagaMiddleware from "redux-saga"


import { Global } from "../blocks"
import { reducers, middlewares, sagas } from "./utilities"

const createReduxStore = (initialState, history) => {

  const joinedReducers = {...reducers, ...{
    routing: routeReducer
  }}

  let convertedSagas = sagas.map((saga) => {
    console.log(saga)
    if (typeof saga === "function") {
      let s = saga()
      return s
    }
  })

  let sharedMiddlewares = [...[
    thunk
  ], ...middlewares]

  let sharedCompose = [
    applyMiddleware(...sharedMiddlewares, sagaMiddleware(...convertedSagas)),
  ]


  if (process.env.NODE_ENV != "production") {
    sharedCompose = [...sharedCompose, ...[
      typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f
    ]]

  }

  const store = compose(...sharedCompose)(createStore)(combineReducers(joinedReducers), initialState)
  // syncReduxAndRouter(history, store)

  return store

}

// @TODO: Remove wrapper for Provider when SSR support is fixed
class Wrapper extends Component {
  componentWillMount() {
    this.store = createReduxStore()
  }

  render () {
    return (
      <Provider store={this.store}>
        {this.props.children}
      </Provider>
    )
  }
}



export {
  Wrapper,
  createReduxStore
}
