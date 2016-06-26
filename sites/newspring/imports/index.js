import { Component } from "react";
import { connect } from "react-redux";

import {
  wrapper,
  createReduxStore,
  GraphQL,
  Routes as Core,
} from "apollos";

import Routes from "./routes";
import Give from "apollos/dist/give"
import Profile from "apollos/dist/profile"

import Global from "apollos/dist/core/blocks/global";

if (process.env.NATIVE) {
  // XXX can be removed when AudioPlayer is imported
  import "./store/audio"
  // import AudioPlayer from "/imports/components/players/audio/index"
  // import LivePlayer from "/imports/components/live"
}

@connect((state) => ({ audio: state.audio }))
class App extends Component {
  render() {
    const { visibility, playing } = this.props.audio;

    let classes = [];

    if (visibility === "dock" && playing.track.title) {
      classes.push("push-double-bottom");
      classes.push("soft-half-bottom");
    }

    return (
      <Global className={classes.join(" ")}>
        {/*<LivePlayer/>*/}
        {this.props.children}
        {/*<AudioPlayer />*/}
      </Global>
    );
  }
}


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
  component: process.env.NATIVE ? App : Global,
  childRoutes: [
    Routes,

    Give,
    Profile,


    // always goes last
    Core,
  ],
};
