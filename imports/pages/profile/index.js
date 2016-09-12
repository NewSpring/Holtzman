
import Home from "./home";
import Settings from "./settings";

import Global from "../../blocks/global";
import Authorized from "../../blocks/authorzied";

const Root = ({ children }) => (
  <Authorized>
    {children}
  </Authorized>
);

export default {
  path: "profile",
  onEnter: (_, replaceState) => {
    if (process.env.WEB) {
      if (_.location.pathname === "/profile" || _.location.pathname === "/profile/") {
        replaceState(null, "/profile/settings");
      }
    }
  },
  component: Root,
  indexRoute: { component: Home },
  childRoutes: [
    ...Settings.Routes,
  ]
};
