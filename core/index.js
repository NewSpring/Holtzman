
/*

  Apollos Core

*/
import "./startup"

import publish from "./publications"
import { wrapper, createReduxStore } from "./store"
import { GraphQL } from "./graphql"

export default {
  name: "Apollos",
  publish,
  wrapper,
  createReduxStore,
  GraphQL,
}
