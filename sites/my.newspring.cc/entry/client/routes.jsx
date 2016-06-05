
import {
  wrapper,
  createReduxStore,
  Routes as Core,
} from "apollos"

import { Global } from "apollos/core/blocks"
import { apolloClient } from "apollos/core/graphql/apollo";

import { Routes } from "app/client"
import Give from "apollos/give"
import Profile from "apollos/profile"
import Community from "apollos/community"

const client = {
  wrapper,
  createReduxStore,
  apolloClient,
  props: {
    onUpdate() {
      const { state } = this
      if (state.location.pathname === "/") {
        this.history.replace("/give/now")
      }
      if (typeof ga != "undefined") {
        ga("send", "pageview")
      }
    }
  }
}

const server = {
  wrapper,
  createReduxStore,
  apolloClient,
}

// const [ Util, NotFound ] = Core

ReactRouterSSR.Run({
  component: Global,
  childRoutes: [

    Routes,

    Give,
    Profile,
    Community,


    // always goes last
    Core,
    // Util,
    // NotFound,
  ]
}, client, server);
