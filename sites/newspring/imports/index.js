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

let App = null;
console.log(process.env.NATIVE)
if (process.env.NATIVE) {
  import AudioPlayer from "/imports/components/players/audio/index"
  // XXX add live query back to heighliner
  // import LivePlayer from "/imports/components/live/index"
  @connect((state) => ({ audio: state.audio }))
  class AppGlobal extends Component {
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
          <AudioPlayer propVal={visibility}/>
        </Global>
      );
    }
  }
  App = AppGlobal;
}

export const client = {
  wrapper,
  createReduxStore,
  wrapperProps: { client: GraphQL },
  props: {
    onUpdate() {
      if (typeof ga != "undefined") {
        ga("send", "pageview");
      }
    },
  },
}

export const server = {
  wrapper,
  createReduxStore,
  wrapperProps: { client: GraphQL },
};
console.log(process.env.NATIVE, process.env.WEB)
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
