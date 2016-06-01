// apollo client imports need to remain in this file
// apollo client does not like to mingle with other imports
// apollo client has not told me why
// apollo client demands exclusivity?
// apollo client is probably fine and it's webpack
// webpack is evil
import ApolloClient, {
  createNetworkInterface,
  readQueryFromStore,
} from "apollo-client";
import gql from "apollo-client/lib/src/gql";
import { AuthTokenHeaderMiddleware } from "apollo-client/lib/src/middleware"
import { addReducer, addMiddleware } from "../store";
import { connect } from "react-apollo";
import { applyMiddleware } from "redux";
import { Tokens } from "../collections";

// let token = "basic ";
// if (Meteor.userId()) {
//   token += new Buffer(`apollos:${Meteor.settings.public.rock.token}`).toString("base64");
// } else {
//   token += new Buffer(`guest:guest`).toString("base64");
// }

let token = Accounts._storedLoginToken && Accounts._storedLoginToken() ? Accounts._storedLoginToken() : null;

const networkInterface = createNetworkInterface(
  Meteor.settings.public.heighliner, {
    headers: {
      Authorization: token,
    },
  }
);

const apolloClient = new ApolloClient({
  networkInterface,
});

addReducer({
  apollo: apolloClient.reducer(),
});
addMiddleware(apolloClient.middleware());

export {
  apolloClient,
  readQueryFromStore,
  connect,
  gql,
};
