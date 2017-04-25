
import { Meteor } from "meteor/meteor";
// eslint-disable-next-line
import { DDP } from "meteor/ddp";
import { Accounts } from "meteor/accounts-base";

import ApolloClient, { createNetworkInterface } from "apollo-client";

const networkInterface = createNetworkInterface({ uri: Meteor.settings.public.heighliner });

const authMiddleware = {
  applyMiddleware(req, next) {
    const request = req;
    let currentUserToken;

    // on the server
    // eslint-disable-next-line
    const status = DDP._CurrentInvocation.get();
    if (status && status.connection && status.connection.id) {
      // eslint-disable-next-line
      currentUserToken = Accounts._getLoginToken(status.connection.id);
    }

    // on the client
    // eslint-disable-next-line
    if (Accounts._storedLoginToken) currentUserToken = Accounts._storedLoginToken();
    if (!currentUserToken) {
      next();
      return;
    }

    if (!request.options.headers) {
      if (fetch.Headers) {
        request.options.headers = new fetch.Headers();
      } else {
        request.options.headers = new Headers();
      }
    }

    request.options.headers.Authorization = currentUserToken;
    request.options.headers.Platform = Meteor.isCordova ? "Native" : "Web";
    request.options.headers.Version = Meteor.settings.public.release;

    next();
  },
};

networkInterface.use([
  authMiddleware,
]);

const GraphQL = new ApolloClient({
  networkInterface,
  ssrMode: Meteor.isServer,
  shouldBatch: false, // XXX not working with multiple root fields on a query
});

export default GraphQL;

export {
  GraphQL,
  networkInterface,
  authMiddleware,
};
