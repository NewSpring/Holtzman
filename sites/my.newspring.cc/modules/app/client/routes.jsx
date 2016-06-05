
import { Global } from "apollos/core/blocks"

import { Routes } from "app/client/pages"

export default {
  path: "/",
  onEnter: (_, replaceState) => {
    if (_.location.pathname === "/") {
      return replaceState(null, "/give/now")
    }
  },
  childRoutes: Routes
}
