
import { Routes } from "./pages"

if (process.env.NATIVE) {
  import Home from "/imports/pages/home/index";
}

const redirectToWelcome = (replace, cb) => {
  if (typeof NativeStorage === "undefined") return cb();
  NativeStorage.getItem("welcomed",
    (welcomed) => {
      if (welcomed) return cb();
      replace({ pathname: "/welcome" });
      return cb();
    },
    (error) => {
      replace({ pathname: "/welcome" });
      return cb();
    },
  );
};

export default {
  path: "/",
  indexRoute: { component: process.env.NATIVE ? Home : null },
  onEnter: (_, replace, cb) => {
    if (process.env.NATIVE && _.location.pathname === "/") {
      redirectToWelcome(replace, cb);
    } else if (process.env.WEB && _.location.pathname === "/") {
      replace({ pathname: "/give/now" });
      return cb();
    } else {
      return cb();
    }
  },
  childRoutes: Routes
}
