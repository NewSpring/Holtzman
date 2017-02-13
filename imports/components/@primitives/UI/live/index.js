import { Component, PropTypes } from "react";
import { graphql } from "react-apollo";
import { connect } from "react-redux";
import gql from "graphql-tag";
import { css } from "aphrodite";
import { Link } from "react-router";
import { Motion, spring } from "react-motion";

import Styles from "./live-css";

import liveActions from "../../../../data/store/live";
import { canSee } from "../../../@enhancers/security-roles";

class LiveWithoutData extends Component {

  static propTypes = {
    live: PropTypes.object, // eslint-disable-line
    dispatch: PropTypes.func,
    data: PropTypes.object, // eslint-disable-line
    person: PropTypes.object,
  }

  componentWillUpdate(nextProps, nextState) {
    this.handleLiveChange(nextProps, nextState);
  }

  getClasses = () => {
    const classes = [
      "text-center",
      "soft-half-ends",
      "display-inline-block",
      "plain",
      "one-whole",
      css(Styles["live-banner"]),
    ];

    if (this.props.live.float) {
      classes.push(css(Styles["live-float"]));
    }

    if (this.props.live.floatDouble) {
      classes.push(css(Styles["live-float-double"]));
    }

    return classes.join(" ");
  }

  getTextClasses = () => {
    const classes = [
      "flush",
      "hard",
      "text-light-primary",
      css(Styles["live-text"]),
    ];

    return classes.join(" ");
  }

  handleLiveChange = (nextProps) => {
    const { live } = nextProps.data;
    if (!live) return;

    const isLive = live.live;
    const embedCode = live.embedCode;

    if (
      isLive === nextProps.live.live &&
      embedCode === nextProps.live.embedCode
    ) {
      return;
    }

    if (isLive) {
      this.props.dispatch(liveActions.set({ isLive, embedCode }));
    } else {
      this.props.dispatch(liveActions.reset());
    }
  }

  render() {
    const { live, show, embedCode } = this.props.live;
    if (!live || !show || !embedCode) return null;

    // TODO load different embed code for beta users

    // create beta link
    const shouldShowBetaLink = (
      this.props.person
      && !this.props.person.authLoading
      && this.props.person.authorized
    );
    const link = shouldShowBetaLink ? `/wowza/${embedCode}` : `/video/${embedCode}`;

    return (
      <Motion
        defaultStyle={{ height: 0 }}
        style={{ height: spring(40) }}
      >
        {(interpolatingStyle) =>
          <Link
            to={link}
            className={this.getClasses()}
            style={interpolatingStyle}
          >
            <h7 className={this.getTextClasses()}>
              NewSpring Church Live, Watch Now!
            </h7>
          </Link>
        }
      </Motion>
    );
  }
}

const LIVE_QUERY = gql`
  query IsLive {
    live {
      live
      embedCode
    }
  }
`;

const map = ({ live }) => ({ live });

const withRedux = connect(map);

// const withLive = graphql(LIVE_QUERY, {
//   options: { pollInterval: 60000 },
// });

// XXX FOR TESTING ONLY
const withLive = graphql(LIVE_QUERY, {
  props: () => ({
    data: {
      live: {
        live: true,
        embedCode: "12345",
      },
    },
  }),
  options: { pollInterval: 60000 },
});

export default withRedux(
  withLive(
    canSee(["RSR - Beta Testers"])(LiveWithoutData)
  )
);

export {
  LiveWithoutData,
  LIVE_QUERY,
  withRedux,
  withLive,
};
