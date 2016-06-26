import {
  wrapper,
  createReduxStore,
  GraphQL,
  Routes as Core,
} from "apollos";

import Global from "apollos/dist/core/blocks/global";

import Routes from "./routes";
import Give from "apollos/dist/give"
import Profile from "apollos/dist/profile"

export const client = {
  wrapper,
  createReduxStore,
  wrapperProps: { client: GraphQL },
  props: {
    onUpdate() {
      if (process.env.WEB) {
        const { state } = this;

        if (state.location.pathname === "/") {
          this.history.replace("/give/now");
        }
      }

      if (typeof ga != "undefined") {
        ga("send", "pageview");
      }
    },
  },
}

export const server = {
  wrapper,
  createReduxStore,
};

export const routes = {
  component: Global,
  childRoutes: [
    Routes,

    Give,
    Profile,


    // always goes last
    Core,
  ],
};
