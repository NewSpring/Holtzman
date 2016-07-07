
import ApolloClient, {
  createNetworkInterface,
  readQueryFromStore,
} from "apollo-client";


const networkInterface = createNetworkInterface(Meteor.settings.public.heighliner);

networkInterface.use([{
  applyMiddleware(request, next) {
    const currentUserToken = Accounts._storedLoginToken();
    if (!currentUserToken) {
      next();
      return;
    }

    if (!request.options.headers) request.options.headers = new Headers();
    request.options.headers.Authorization = currentUserToken;

    next();
  },
}])

const GraphQL = new ApolloClient({
  networkInterface,
  shouldBatch: false, // XXX not working with multiple root fields on a query
});

export {
  GraphQL,
};
