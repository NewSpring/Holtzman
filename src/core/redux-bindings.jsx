import { Component, PropTypes} from "react"
import { createStore, combineReducers, compose, applyMiddleware } from "redux"
import { syncReduxAndRouter, routeReducer } from "redux-simple-router"
import { Provider } from "react-redux"
import thunk from "redux-thunk"

import { reducers } from "./client/reducers"
import { getRoutes } from "./lib/store"
import { middlewares } from "./client/middlewares"

const createReduxStore = (initialState, history) => {

  const routes = getRoutes()
  const joinedReducers = {...reducers, ...{
    routing: routeReducer
  }}

  let sharedMiddlewares = [...[
    thunk
  ], ...middlewares]

  let sharedCompose = [
    applyMiddleware(...sharedMiddlewares),
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


// class Wrapper extends Component {
//   componentWillMount() {
//     this.store = createReduxStore()
//   }
//
//   render () {
//     return (
//       <Provider store={this.store}>{this.props.children}</Provider>
//     )
//   }
// }



export {
  Provider as Wrapper,
  createReduxStore
}
