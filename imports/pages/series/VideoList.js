import PropTypes from 'prop-types';
import { Component } from "react";
import { connect } from "react-redux";
import { graphql } from "react-apollo";
import gql from "graphql-tag";

import SeriesVideoListItem from "./VideoListItem";
import { Spinner } from "../../components/@primitives/UI/loading";

class SeriesVideoListWithoutData extends Component {

  static propTypes = {
    sermons: PropTypes.object.isRequired,
  }

  dynamicWidth = () => {
    if (typeof window !== "undefined" || window !== null) {
      const ratio = window.isTablet ? 0.375 : 0.8;
      let itemSize = (window.innerWidth - 40) * ratio; // four-fifths
      itemSize += 20; // account for margin
      const items = this.props.sermons.content.sermons.length;
      const width = (items * itemSize) + 40;
      return {
        width: `${width}px`,
      };
    }

    return {};
  }

  overflow = {
    overflowX: "scroll",
    overflowY: "hidden",
    paddingLeft: "20px",
    WebkitOverflowScrolling: "touch",
  }

  render() {
    const { content } = this.props.sermons;

    if (this.props.sermons.loading) {
      return (
        <div className="text-center soft-ends">
          <Spinner />
        </div>
      );
    }

    if (!content || content.sermons.length === 0) return null;

    const { sermons } = content;

    return (
      <div style={this.overflow}>
        <section
          className="soft-half-top"
          style={this.dynamicWidth()}
        >
          {sermons.map((sermon, i) => (
            <SeriesVideoListItem sermon={sermon} order={i} key={i} />
          ))}
        </section>
      </div>
    );
  }
}

const SERMONS_QUERY = gql`
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
`;

const withSermons = graphql(SERMONS_QUERY, {
  name: "sermons",
  options: ownProps => ({
    variables: { id: ownProps.id },
  }),
});

export default connect()(
  withSermons(
    SeriesVideoListWithoutData,
  ),
);

export {
  SeriesVideoListWithoutData,
  SERMONS_QUERY,
};
