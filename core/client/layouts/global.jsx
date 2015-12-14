
import { Component, PropTypes } from "react"
import { createStore, combineReducers, compose, applyMiddleware } from "redux"
import { reduxReactRouter, routerStateReducer } from "redux-router"

let createHistory;
if (Meteor.isClient) {
  createHistory = require("history/lib/createBrowserHistory");
}

if (Meteor.isServer) {
  createHistory = require("history/lib/createMemoryHistory");
}

import { Provider } from 'react-redux'


import { reducers } from "../reducers"
import { getRoutes } from "../../lib/store"
import { Nav } from "../components"


class App extends Component {

  render() {
    return (
      <div className="push-double-bottom soft-bottom">
        {this.props.children}
        <Nav />
      </div>
    )

  }

}

export default class Global extends Component {


  componentWillMount() {

    const routes = getRoutes()

    this.store = compose(
      // applyMiddleware(m1, m2, m3),
      reduxReactRouter({
        routes,
        createHistory
      })
    )(createStore)(combineReducers(reducers))
  }


  render () {
    return (
      <Provider store={this.store} >
        <App {...this.props}/>
      </Provider>
    )
  }
}
