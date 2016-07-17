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
if (process.env.NATIVE) {
  import scriptLoader from "react-async-script-loader";
  import AudioPlayer from "/imports/components/players/audio/index"

  // sync load ooyala scripts
  // XXX can we move this to just the video component?
  const scripts = [
    "//player.ooyala.com/static/v4/stable/4.5.5/core.min.js",
    "//player.ooyala.com/static/v4/stable/4.5.5/video-plugin/main_html5.min.js",
    "//player.ooyala.com/static/v4/stable/4.5.5/skin-plugin/html5-skin.js",
  ];
  if (Meteor.isCordova) {
    scripts.push(
      "//player.ooyala.com/static/v4/stable/4.5.5/video-plugin/bit_wrapper.min.js"
    );
  }
  @scriptLoader(...scripts)
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
