import { Component, PropTypes } from "react";
import { connect, gql } from "apollos/core/graphql/apollo";

import SeriesVideoListItem from "./series.VideoListItem";
import { Spinner } from "apollos/core/components/loading"

import SermonsQuery from "./queries/relatedSermons"

const mapQueriesToProps = ({ ownProps, state }) => {
  const pathParts = state.routing.location.pathname.split("/");
  return {
    sermons: {
      query: gql`${SermonsQuery}`,
      variables: {
        entryId: Number(pathParts[2]),
      },
      forceFetch: false,
      returnPartialData: false,
    },
  };
};
@connect({ mapQueriesToProps })
export default class SeriesVideoList extends Component {

  dynamicWidth = () => {

    if (typeof window != "undefined" || window != null) {
      let itemSize = (window.innerWidth - 40) * 0.8; // four-fifths
      itemSize += 20; // account for margin
      const items = this.props.sermons.allContent.length;
      const width = (items * itemSize) + 40;
      return {
        width: `${width}px`
      }
    }

    return {}
  }

  overflow = {
    overflowX: "scroll",
    overflowY: "hidden",
    "WebkitOverflowScrolling": "touch"
  }

  render() {

    const { allContent } = this.props.sermons;

    if (!allContent) {
      return (
        <div className="text-center soft-ends">
          <Spinner />
        </div>
      )
    }

    const sermons = allContent;

    return (
      <div style={this.overflow}>
        <section
          className="soft-half-top"
          style={this.dynamicWidth()}
          >
          {sermons.map((sermon, i) => {
            return <SeriesVideoListItem sermon={sermon} order={i} key={i} />
          })}
        </section>
      </div>
    );
  }
}
