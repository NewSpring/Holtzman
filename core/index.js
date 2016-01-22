
/*

  Apollos Core

*/
import "./startup"

import publish from "./publications"
import { Wrapper, createReduxStore } from "./store"
import { GraphQL } from "./graphql"

export default {
  name: "Apollos",
  publish,
  Wrapper,
  createReduxStore,
  GraphQL,
}
