
import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";

import ApolloClient, { createNetworkInterface } from "apollo-client";

const networkInterface = createNetworkInterface({ uri: Meteor.settings.public.heighliner });

networkInterface.use([{
  applyMiddleware(req, next) {
    const request = req;

    // eslint-disable-next-line
    const currentUserToken = Accounts._storedLoginToken && Accounts._storedLoginToken();
    if (!currentUserToken) {
      next();
      return;
    }

    if (!request.options.headers) request.options.headers = new Headers();
    request.options.headers.Authorization = currentUserToken;

    next();
  },
}]);

const GraphQL = new ApolloClient({
  networkInterface,
  ssrMode: Meteor.isServer,
  shouldBatch: false, // XXX not working with multiple root fields on a query
});

export default GraphQL;

export {
  GraphQL,
};
