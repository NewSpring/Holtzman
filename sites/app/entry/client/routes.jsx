import { Component, PropTypes } from "react"
import { connect } from "react-redux"
import { wrapper, createReduxStore } from "apollos/core"

import { Routes } from "app/client"
import Give from "apollos/give"
import Profile from "apollos/profile"
import Groups from "apollos/community"

import { Global } from "apollos/core/blocks"
import { RouteTransition } from "apollos/core/components/transitions"
import Header from "apollos/core/components/header/"
import { apolloClient } from "apollos/core/graphql/apollo"
import AudioPlayer from "app/client/components/players/audio"
import LivePlayer from "app/client/components/live"
// import { ComingSoon } from "app/client/components/content"

// import createHistory from "history/lib/createBrowserHistory"
// import useScroll from "scroll-behavior/lib/useStandardScroll"

const map = (state) => ({
  audio: state.audio,
  location: state.routing.location,
  modal: state.modal,
})
@connect(map)
class Layout extends Component {
  render() {

    const { modal } = this.props;
    const { visibility, playing } = this.props.audio;

    let classes = [];

    if (visibility === "dock" && playing.track.title) {
      classes.push("push-double-bottom");
      classes.push("soft-half-bottom");
    }

    return (
      <Global className={classes.join(" ")}>
        <Header />
        {/*<LivePlayer/>*/}
        {this.props.children}
        <AudioPlayer />
      </Global>
    );
  }
}

const App = ({children}) => (
  <wrapper>
    <Layout>
      {children}
    </Layout>
  </wrapper>
)


const client = {
  wrapper,
  createReduxStore,
  apolloClient,
  // history: browserHistory,
  props: {
    onUpdate() {
      if (typeof ga != "undefined") {
        ga("send", "pageview");
      }
    }
  }
}

const server = {
  wrapper,
  createReduxStore,
  apolloClient,
  disableSSR: true,
}


ReactRouterSSR.Run({
  component: App,
  childRoutes: [
    Routes,
    Give,
    Profile,
    Groups
  ]
}, client, server);
