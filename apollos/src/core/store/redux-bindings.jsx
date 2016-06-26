import "regenerator-runtime/runtime"

import { Component, PropTypes } from "react"
import { createStore, combineReducers, compose, applyMiddleware } from "redux"
import { ApolloProvider } from "react-apollo"
import sagaMiddleware from "redux-saga"

import { GraphQL } from "../graphql";

import { reducers, middlewares, sagas } from "./utilities"
import { syncHistory, routeReducer } from "../store/routing"

const createReduxStore = (initialState, history) => {

  if (initialState) {
    // bug with SSR
    delete initialState.nav
  }

  const joinedReducers = {...reducers, ...{
    routing: routeReducer,
    apollo: GraphQL.reducer(),
  }};

  let convertedSagas = sagas.map((saga) => (saga()));

  let sharedMiddlewares = [...middlewares, ...GraphQL.middleware()];

  const sagaMiddleware = require("redux-saga").default;
  const reduxRouterMiddleware = syncHistory(history);

  let sharedCompose = [
    applyMiddleware(
      ...sharedMiddlewares,
      sagaMiddleware(...convertedSagas),
      reduxRouterMiddleware
    ),
  ];

  if (process.env.NODE_ENV != "production") {
    sharedCompose = [...sharedCompose, ...[
      typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f
    ]];
  }


  return compose(...sharedCompose)(createStore)(
    combineReducers(joinedReducers), initialState
  );

};


const wrapper = ApolloProvider;

export {
  wrapper,
  createReduxStore
}
