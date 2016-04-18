// apollo client imports need to remain in this file
// apollo client does not like to mingle with other imports
// apollo client has not told me why
// apollo client demands exclusivity?
// apollo client is probably fine and it's webpack
// webpack is evil
import ApolloClient, { createNetworkInterface } from "apollo-client";
import { readQueryFromStore } from "apollo-client/lib/src/data/readFromStore";
import { addReducer, addMiddleware } from "../store";

const heighliner = createNetworkInterface("http://localhost:8888/");
const apolloClient = new ApolloClient({
  networkInterface: heighliner,
});

addReducer({
  apollo: apolloClient.reducer(),
});
addMiddleware(apolloClient.middleware());

export {
  apolloClient,
  readQueryFromStore,
};
