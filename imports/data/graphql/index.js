
import { Meteor } from "meteor/meteor";
// eslint-disable-next-line
import { DDP } from "meteor/ddp";
import { Accounts } from "meteor/accounts-base";

import ApolloClient, { createNetworkInterface } from "apollo-client";
import { IntrospectionFragmentMatcher } from "react-apollo";

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

const myFragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData: {
    __schema: {
      types: [
        {
          kind: "INTERFACE",
          name: "Node",
          possibleTypes: [
            {
              name: "User",
            },
            {
              name: "Content",
            },
            {
              name: "Campus",
            },
            {
              name: "Location",
            },
            {
              name: "File",
            },
            {
              name: "Navigation",
            },
            {
              name: "Person",
            },
            {
              name: "PhoneNumber",
            },
            {
              name: "Group",
            },
            {
              name: "DefinedValue",
            },
            {
              name: "GroupSchedule",
            },
            {
              name: "GroupMember",
            },
            {
              name: "GroupLocation",
            },
            {
              name: "Attribute",
            },
            {
              name: "AttributeValue",
            },
            {
              name: "SavedPayment",
            },
            {
              name: "PaymentDetail",
            },
            {
              name: "Transaction",
            },
            {
              name: "TransactionDetail",
            },
            {
              name: "FinancialAccount",
            },
            {
              name: "ScheduledTransaction",
            },
            {
              name: "BinaryFile",
            },
          ],
        },
        {
          kind: "INTERFACE",
          name: "MutationResponse",
          possibleTypes: [
            {
              name: "PhoneNumberMutationResponse",
            },
            {
              name: "DeviceRegistrationMutationResponse",
            },
            {
              name: "AttributeValueMutationResponse",
            },
            {
              name: "OrderMutationResponse",
            },
            {
              name: "CompleteOrderMutationResponse",
            },
            {
              name: "ValidateMutationResponse",
            },
            {
              name: "SavePaymentMutationResponse",
            },
            {
              name: "ScheduledTransactionMutationResponse",
            },
            {
              name: "StatementMutationResponse",
            },
            {
              name: "GroupsMutationResponse",
            },
            {
              name: "LikesMutationResponse",
            },
          ],
        },
      ],
    },
  },
});

const GraphQL = new ApolloClient({
  networkInterface,
  ssrMode: Meteor.isServer,
  shouldBatch: false, // XXX not working with multiple root fields on a query
  fragmentMatcher: myFragmentMatcher,
});

export default GraphQL;

export {
  GraphQL,
  networkInterface,
  authMiddleware,
};
