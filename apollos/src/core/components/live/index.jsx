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
    const { live, streamUrl } = this.props.data;

    return (
      <div
        className="background--secondary text-center soft-half-ends"
      >
        <h7 className="text-light-primary flush hard">
          NewSpring Church Live, Watch Now!
        </h7>
      </div>
    )
  }
}
