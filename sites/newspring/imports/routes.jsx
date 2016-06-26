
// import { Routes } from "./pages"

if (process.env.NATIVE) {
  import Home from "/imports/pages/home/index";
}

export default {
  path: "/",
  indexRoute: { component: process.env.NATIVE ? Home : null },
  onEnter: (_, replaceState) => {
    if (process.env.WEB && _.location.pathname === "/") {
      return replaceState(null, "/give/now");
    }
  },
  // childRoutes: Routes
}
