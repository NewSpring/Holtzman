import { graphql } from "react-apollo";
import gql from "graphql-tag";

const RECENT_LIKES_QUERY = gql`
  {
    recentlyLiked(limit: 10, skip: 0) {
      id
      ... on Content {
        title
        channelName
        content {
          images(sizes: ["medium"]) {
            id
            url
          }
        }
      }
      ... on Group {
        name
      }
    }
  }
`;

const withRecentLikes = graphql(RECENT_LIKES_QUERY);

export default withRecentLikes;
