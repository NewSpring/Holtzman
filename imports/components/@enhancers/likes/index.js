import { graphql } from "react-apollo";
import gql from "graphql-tag";

const PUBLIC_LIKES_QUERY = gql`
  query getPublicLikes {
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

const withPublicLikes = graphql(PUBLIC_LIKES_QUERY, {
  props: ({ data }) => ({
    publicLikes: data,
  }),
});

export default withPublicLikes;
