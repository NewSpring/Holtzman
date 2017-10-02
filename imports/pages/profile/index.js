import PropTypes from 'prop-types';
import Home from "./home";
import Settings from "./settings";

import Authorized from "../../components/people/authorized";

const Root = ({ children }) => (
  <Authorized>
    {children}
  </Authorized>
);

Root.propTypes = {
  children: PropTypes.object.isRequired,
};

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
  ],
};

export {
  Root,
};
