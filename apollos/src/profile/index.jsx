

import { Global, Authorized } from "../core/blocks"
import { Home, Routes } from "./pages"


const Root = ({ children }) => (
  <Authorized>
    {children}
  </Authorized>
)

export default {
  path: "profile",
  onEnter: (_, replaceState) => {
    if (process.env.WEB) {
      if (_.location.pathname === "/profile" || _.location.pathname === "/profile/") {
        replaceState(null, "/profile/settings")
      }
    }
  },
  component: Root,
  indexRoute: { component: Home },
  childRoutes: Routes
}
