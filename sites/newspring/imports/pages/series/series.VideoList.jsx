import { Component, PropTypes } from "react";
import { connect } from "react-apollo";
import gql from "graphql-tag";

import SeriesVideoListItem from "./series.VideoListItem";
import { Spinner } from "apollos-core/dist/core/components/loading"

const mapQueriesToProps = ({ ownProps }) => ({
  sermons: {
    query: gql`
      query GetSermonsFromSeries($id: ID!) {
        content: node(id: $id) {
          ... on Content {
            sermons: children(channels: ["sermons"]) {
              id
              entryId: id
              title
              status
              channelName
              parent {
                entryId: id
              }
              meta {
                urlTitle
                siteId
                date
                channelId
              }
              content {
                speaker
              }
            }
          }
        }
      }
    `,
    variables: { id: ownProps.id },
    forceFetch: false,
    returnPartialData: false,
  },
});
@connect({ mapQueriesToProps })
export default class SeriesVideoList extends Component {

  dynamicWidth = () => {

    if (typeof window != "undefined" || window != null) {
      let itemSize = (window.innerWidth - 40) * 0.8; // four-fifths
      itemSize += 20; // account for margin
      const items = this.props.sermons.content.sermons.length;
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

    const { content } = this.props.sermons;

    if (!content) {
      return (
        <div className="text-center soft-ends">
          <Spinner />
        </div>
      )
    }

    const { sermons } = content;

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
