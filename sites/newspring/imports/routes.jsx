
// import { Routes } from "./pages"

if (process.env.NATIVE) {
  import Home from "/imports/pages/home/index";
}

export default {
  path: "/",
  indexRoute: { component: process.env.NATIVE ? Home : null },
  onEnter: (_, replace) => {
    if (process.env.WEB && _.location.pathname === "/") {
      return replace({ pathname: "/give/now" });
    }
  },
  // childRoutes: Routes
}
