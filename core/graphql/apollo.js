import ApolloClient, { createNetworkInterface } from "apollo-client";
import { readQueryFromStore } from "apollo-client/lib/src/data/readFromStore";

const heighliner = createNetworkInterface("http://localhost:8888/");
const apolloClient = new ApolloClient({
  networkInterface: heighliner,
});

export {
  apolloClient,
  readQueryFromStore,
};
