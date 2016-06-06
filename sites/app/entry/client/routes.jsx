import { Component, PropTypes } from "react"
import { connect } from "react-redux"
import { wrapper, createReduxStore } from "apollos"

import { Routes } from "app/client"
import Give from "apollos/give"
import Profile from "apollos/profile"
import Groups from "apollos/community"

import { Global } from "apollos/core/blocks"
import { RouteTransition } from "apollos/core/components/transitions"
import { apolloClient } from "apollos/core/graphql/apollo"
import AudioPlayer from "app/client/components/players/audio"
import LivePlayer from "app/client/components/live"
// import { ComingSoon } from "app/client/components/content"

// import createHistory from "history/lib/createBrowserHistory"
// import useScroll from "scroll-behavior/lib/useStandardScroll"

@connect((state) => ({
  color: state.header.content.color || "#6BAC43",
  light: state.header.content.light,
  text: state.header.content.title,
  visible: state.header.visible,
}))
export default class Header extends Component {

  render () {
    const lightColor = "text-light-primary";
    const darkColor = "text-dark-primary";

    let text = lightColor;
    if (!this.props.light) {
      text = darkColor;
    }

    if (!this.props.visible) {
      return null;
    }
    return (
      <div
        className="text-center"
        style={{
          paddingTop: "15px",
          paddingBottom: "15px",
          backgroundColor: this.props.color,
          borderBottom: "1px solid rgba(0,0,0, 0.1)",
          position: "relative",
          zIndex: 100
        }}
      >
      {(() => {
        if (this.props.text === "default") {
          return (
            <h6 className={`flush hard ${text} uppercase one-whole`}
              style={{
                fontWeight: 900,
                letterSpacing: "1px",
              }}>
              NewSpring
            </h6>
          )
        }

        return (
          <h6 className={`flush-bottom soft-sides ${text}`} style={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}>
            {this.props.text}
          </h6>
        )
      })()}

      </div>
    )
  }
}


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
