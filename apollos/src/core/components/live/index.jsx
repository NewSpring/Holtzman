import { Component, PropTypes } from "react";
import { connect } from "react-apollo";
import gql from "graphql-tag";
import { css } from "aphrodite";
import { Link } from "react-router";
import { Motion, spring } from "react-motion";

import Styles from "./live-css";

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
      css(Styles["live-banner"])
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
      css(Styles["live-text"])
    ];

    return classes.join(" ");
  }

  render () {
    const { live, embedCode } = this.props.data;

    if (!this.props.live.show) return <div />

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
