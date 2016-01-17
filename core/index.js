
/*

  Apollos Core

*/
import "./startup"

import publish from "./publications"
import { Wrapper, createReduxStore } from "./store"

export default {
  name: "Apollos",
  publish,
  Wrapper,
  createReduxStore,
}
