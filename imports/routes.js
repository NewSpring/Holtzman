
import { Meteor } from "meteor/meteor";
import ChildrenRoutes from "./pages";

if (process.env.NATIVE) {
  // eslint-disable-next-line no-unused-vars
  import Home from "./pages/home";
}

const redirectToWelcome = (replace, cb) => {
  if (typeof NativeStorage === "undefined") return cb();
  return NativeStorage.getItem("welcomed",
    welcomed => {
      if (welcomed) return cb();
      replace({ pathname: "/welcome" });
      return cb();
    },
    () => {
      replace({ pathname: "/welcome" });
      return cb();
    },
  );
};

export default {
  path: "/",
  // eslint-disable-next-line no-undef
  indexRoute: { component: process.env.NATIVE ? Home : null },
  onEnter: (_, replace, cb) => {
    if (process.env.NATIVE && _.location.pathname === "/") {
      return redirectToWelcome(replace, cb);
    } else if (process.env.WEB && _.location.pathname === "/") {
      if (Meteor.userId()) {
        replace({ pathname: "/give/home" });
      } else {
        replace({ pathname: "/give/now" });
      }
      return cb();
    }
    return cb();
  },
  childRoutes: ChildrenRoutes,
};
