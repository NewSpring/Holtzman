
/*

  Apollos Core

*/
import "./startup"

import publish from "./publications"
import { wrapper, createReduxStore } from "./store"
import { GraphQL } from "./graphql"

if (Meteor.isServer) {
  require("./graphql/server");
}

export {
  publish,
  wrapper,
  createReduxStore,
  GraphQL,
}
