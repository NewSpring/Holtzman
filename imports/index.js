/* eslint-disable react/prefer-stateless-function */
import { Component, PropTypes } from "react";
import { connect } from "react-redux";

import scriptLoader from "react-async-script-loader";
import AudioPlayer from "./components/@primitives/players/audio";

import { wrapper, createReduxStore } from "./data/store";

import { GraphQL } from "./data/graphql";

import Routes from "./routes";
import Global from "./components/@primitives/layout/global";

let App = null;

if (process.env.NATIVE) {
  const scripts = ["//fast.wistia.com/assets/external/E-v1.js"];
  @scriptLoader(...scripts)
  @connect(state => ({ audio: state.audio, pathname: state.routing.location.pathname }))
  class AppGlobal extends Component {
    static propTypes = {
      pathname: PropTypes.string.isRequired,
      audio: PropTypes.object.isRequired,
      children: PropTypes.object.isRequired,
    };

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
