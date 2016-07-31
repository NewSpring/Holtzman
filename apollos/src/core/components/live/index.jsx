import { Component, PropTypes } from "react";
import { connect } from "react-apollo";
import gql from "graphql-tag";
import { css } from "aphrodite";
import { Link } from "react-router";
import { Motion, spring } from "react-motion";

import Styles from "./live-css";

import liveActions from "../../store/live";

const mapQueriesToProps = ({ ownProps, state }) => {
  return {
    data: {
      query: gql`query IsLive {
        live {
          live
          embedCode
        }
      }`,
      forceFetch: false,
      returnPartialData: false,
      pollInterval: 60000,
    },
  };
};

const mapStateToProps = (state) => ({ live: state.live });

@connect({ mapQueriesToProps, mapStateToProps })
export default class Live extends Component {

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

  componentWillUpdate(nextProps, nextState) {
    this.handleLiveChange(nextProps, nextState);
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

  render () {
    const { live, show, embedCode } = this.props.live;
    if (!live || !show || !embedCode) return null;

    return (
      <Motion
        defaultStyle={{height: 0}}
        style={{height: spring(40)}}
      >
        {interpolatingStyle => {
          return (
            <Link
              to={`/video/${embedCode}`}
              className={this.getClasses()}
              style={interpolatingStyle}
            >
              <h7 className={this.getTextClasses()}>
                NewSpring Church Live, Watch Now!
              </h7>
            </Link>
          );
        }}
      </Motion>
    )
  }
}
