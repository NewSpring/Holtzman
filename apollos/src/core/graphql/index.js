
import ApolloClient, {
  createNetworkInterface,
  readQueryFromStore,
} from "apollo-client";


let hasToken = Accounts._storedLoginToken && Accounts._storedLoginToken();
let token =  hasToken ? Accounts._storedLoginToken() : null;

const networkInterface = createNetworkInterface(Meteor.settings.public.heighliner, {
  headers: { Authorization: token },
});

const GraphQL = new ApolloClient({
  networkInterface,
  // shouldBatch: true, // XXX not working yet
});

export {
  GraphQL,
};
