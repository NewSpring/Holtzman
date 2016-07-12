import { Component, PropTypes } from "react";
import { connect } from "react-apollo";
import gql from "graphql-tag";
import { css } from "aphrodite";

import Styles from "./live-css";

const mapQueriesToProps = ({ ownProps, state }) => {
  return {
    data: {
      query: gql`query IsLive {
        live {
          live
          streamUrl
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
      "background--secondary",
      "text-center",
      "soft-half-ends",
    ];

    if (this.props.live.float) {
      classes.push(css(Styles["live-float"]));
    }

    return classes.join(" ");
  }

  render () {
    const { live, streamUrl } = this.props.data;

    if (!this.props.live.show) return <div />

    return (
      <div
        className={this.getClasses()}
      >
        <h7 className="text-light-primary flush hard">
          NewSpring Church Live, Watch Now!
        </h7>
      </div>
    )
  }
}
