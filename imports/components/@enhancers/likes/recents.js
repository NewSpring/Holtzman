import { graphql } from "react-apollo";
import gql from "graphql-tag";
import { contentCard, groupCard } from "./fragments";

const RECENT_LIKES_QUERY = gql`
  {
    recentlyLiked(limit: 10, skip: 0) {
      ... ContentCard
      ... GroupCard
    }
  }
  ${contentCard}
  ${groupCard}
`;

const withRecentLikes = graphql(RECENT_LIKES_QUERY, { name: "recentLikes" });

export default withRecentLikes;
