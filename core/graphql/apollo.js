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
