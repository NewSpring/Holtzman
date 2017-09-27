import "regenerator-runtime/runtime";

import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import { ApolloProvider } from "react-apollo";
import createSagaMiddleware from "redux-saga";
import reduxReset from "redux-reset";

import GraphQL from "../graphql";

import { reducers, middlewares, sagas } from "./utilities";
import { syncHistory, routeReducer } from "./routing";

const createReduxStore = (initialState, history) => {
  if (initialState) {
    // bug with SSR
    delete initialState.nav; // eslint-disable-line no-param-reassign
  }

  const joinedReducers = { ...reducers,
    ...{
      routing: routeReducer,
      apollo: GraphQL.reducer(),
    },
  };

  const sharedMiddlewares = [...middlewares, GraphQL.middleware()];

  const reduxRouterMiddleware = syncHistory(history);

  const sagaMiddleware = createSagaMiddleware();

  let sharedCompose = [
    applyMiddleware(
      ...sharedMiddlewares,
      sagaMiddleware,
      reduxRouterMiddleware,
    ),
    reduxReset(),
  ];

  if (process.env.NODE_ENV !== "production") {
    sharedCompose = [...sharedCompose, ...[
      typeof window === "object" && typeof window.devToolsExtension !== "undefined" ?
        window.devToolsExtension() :
        f => f,
    ]];
  }

  const store = compose(...sharedCompose)(createStore)(
    combineReducers(joinedReducers), initialState,
  );

  sagas.forEach(saga => sagaMiddleware.run(saga()));

  return store;
};


const wrapper = ApolloProvider;

export {
  wrapper,
  createReduxStore,
};
