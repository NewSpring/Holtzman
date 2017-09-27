/* eslint-disable react/prefer-stateless-function */
import Meteor from "meteor/meteor";
import { Component, PropTypes } from "react";
import { connect } from "react-redux";

import {
  wrapper,
  createReduxStore,
} from "./data/store";

import { GraphQL } from "./data/graphql";

import Routes from "./routes";
import Global from "./components/@primitives/layout/global";

let App = null;

if (process.env.NATIVE) {
  import scriptLoader from "react-async-script-loader";
  import AudioPlayer from "./components/@primitives/players/audio";

  // sync load ooyala scripts
  // XXX can we move this to just the video component?
  const scripts = [
    "//player.ooyala.com/static/v4/stable/4.6.9/core.min.js",
    "//player.ooyala.com/static/v4/stable/4.6.9/video-plugin/main_html5.min.js",
    "//player.ooyala.com/static/v4/stable/4.6.9/skin-plugin/html5-skin.js",
  ];
  if (Meteor.isCordova) {
    scripts.push(
      "//player.ooyala.com/static/v4/stable/4.6.9/video-plugin/bit_wrapper.min.js",
    );
  }
  @scriptLoader(...scripts)
  @connect(state => ({ audio: state.audio, pathname: state.routing.location.pathname }))
  class AppGlobal extends Component {

    static propTypes = {
      pathname: PropTypes.string.isRequired,
      audio: PropTypes.object.isRequired,
      children: PropTypes.object.isRequired,
    }

    render() {
      if (this.props.pathname === "/welcome") {
        return <div>{this.props.children}</div>;
      }
      const { visibility, playing } = this.props.audio;

      const classes = [];

      if (visibility === "dock" && playing.track.title) {
        classes.push("push-double-bottom");
        classes.push("soft-half-bottom");
      }

      return (
        <Global className={classes.join(" ")}>
          {this.props.children}
          <AudioPlayer propVal={visibility} />
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
};

export const server = {
  wrapper,
  createReduxStore,
  wrapperProps: { client: GraphQL },
};

export const routes = {
  component: process.env.NATIVE ? App : Global,
  childRoutes: [Routes],
};
