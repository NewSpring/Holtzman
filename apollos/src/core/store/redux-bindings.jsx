import "regenerator-runtime/runtime"

import { Component, PropTypes } from "react"
import { createStore, combineReducers, compose, applyMiddleware } from "redux"
import { ApolloProvider } from "react-apollo"
import createSagaMiddleware from "redux-saga"
import reduxReset from "redux-reset";

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

  let sharedMiddlewares = [...middlewares, ...GraphQL.middleware()];

  const reduxRouterMiddleware = syncHistory(history);

  const sagaMiddleware = createSagaMiddleware();
  let sharedCompose = [
    applyMiddleware(
      ...sharedMiddlewares,
      sagaMiddleware,
      reduxRouterMiddleware
    ),
    reduxReset(),
  ];

  if (process.env.NODE_ENV != "production") {
    sharedCompose = [...sharedCompose, ...[
      typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f
    ]];
  }

  const store = compose(...sharedCompose)(createStore)(
    combineReducers(joinedReducers), initialState
  );

  sagas.forEach(saga => sagaMiddleware.run(saga()));

  return store;

};


const wrapper = ApolloProvider;

export {
  wrapper,
  createReduxStore
}
