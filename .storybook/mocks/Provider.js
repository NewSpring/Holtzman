
import { Provider } from "react-redux";
import { ApolloProvider } from "react-apollo";
import { browserHistory } from "react-router";

import { GraphQL } from "/imports/data/graphql"
import { createReduxStore } from "/imports/data/store";

export default ({ children, initialState = {}}) => (
  <ApolloProvider client={GraphQL} store={createReduxStore({}, browserHistory)} >
    {children}
  </ApolloProvider>
)

const ReduxProvider = ({ children, initialState = {} }) => (
  <Provider store={createReduxStore(initialState, browserHistory)} >
    {children}
  </Provider>
);

export {
  ReduxProvider
}
