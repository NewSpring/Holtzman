import { Component, PropTypes } from "react";
import { connect } from "react-apollo";
import gql from "graphql-tag";

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

@connect({ mapQueriesToProps })
export default class Live extends Component {
  render () {
    // const { live } = this.props.data;

    return (
      <div
        className="locked-top locked-sides background--secondary text-center"
        style={{
          zIndex: 999,
          opacity: .9,
          paddingTop: "5px",
          paddingBottom: "5px",
          top: "45px",
        }}
      >
        <p className="text-light-primary flush hard"><small><em>
          Streaming Live - Watch Now
          <span
            className="icon-arrow-next"
            style={{
              display: "12px",
              fontSize: "12px",
              marginLeft: "7px",
            }}
          >

          </span>
        </em></small></p>
      </div>
    )
  }
}
