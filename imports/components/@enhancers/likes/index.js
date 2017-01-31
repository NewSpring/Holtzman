import { graphql } from "react-apollo";
import gql from "graphql-tag";

const PUBLIC_LIKES_QUERY = gql`
  {
    recentlyLiked(limit: 10, skip: 0) {
      id
      ... on Content {
        entryId: id
        title
        channel: channelName
        channelName
        parent {
          channelName
          entryId: id
          content {
            images(sizes: ["medium"]) {
              url
              label
              fileLabel
              id
            }
          }
        }
        content {
          images(sizes: ["medium"]) {
            url
            label
            fileLabel
            id
          }
        }
      }
      ... on Group {
        name
      }
    }
  }
`;

const withPublicLikes = graphql(PUBLIC_LIKES_QUERY, { name: "publicLikes" });

export default withPublicLikes;
