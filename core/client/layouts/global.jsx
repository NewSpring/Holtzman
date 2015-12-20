
let ch;
import { Component, PropTypes } from "react"
import { createStore, combineReducers, compose, applyMiddleware } from "redux"
import { reduxReactRouter, routerStateReducer } from "redux-router"
if (Meteor.isClient) { ch = require("history/lib/createBrowserHistory") }
if (Meteor.isServer) { ch = require("history/lib/createMemoryHistory") }
import persistState from "redux-localstorage"
import createLogger from "redux-logger"
import { Provider } from "react-redux"
import thunk from "redux-thunk"

import { reducers } from "../reducers"
import { getRoutes } from "../../lib/store"
import { middlewares } from "../middlewares"
import { Nav, Modal } from "../blocks"


class App extends Component {

  render() {
    return (
      <div className="
        push-double-bottom@handheld soft-bottom@handheld
        push-double-left@lap-and-up soft-double-left@lap-and-up
        "
      >
        {this.props.children}
        <Nav />
        <Modal/>
      </div>
    )

  }

}

export default class Global extends Component {

  componentWillMount() {

    const routes = getRoutes()
    const joinedReducers = {...reducers, ...{
      router: routerStateReducer
    }}

    const logger = createLogger()

    let sharedMiddlewares = [...[
      thunk
    ], ...middlewares]

    // setup dev middlewares
    if (process.env.NODE_ENV != "production") {
      sharedMiddlewares = [...sharedMiddlewares, ...[
        logger
      ]]
    }

    let sharedCompose = [
      applyMiddleware(...sharedMiddlewares),
      reduxReactRouter({ routes, createHistory: ch }),
    ]

    if (process.env.NODE_ENV != "production") {
      sharedCompose = [...sharedCompose, ...[
        typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f
      ]]

    } else {
      sharedCompose = [...sharedCompose, ...[
        persistState()
      ]]
    }

    this.store = compose(...sharedCompose)(createStore)(combineReducers(joinedReducers))

  }



  render () {
    return (
      <Provider store={this.store} >
        <App {...this.props}/>
      </Provider>
    )
  }
}
