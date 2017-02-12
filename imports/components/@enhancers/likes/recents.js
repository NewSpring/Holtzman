import { graphql } from "react-apollo";
import gql from "graphql-tag";
import { contentCard, groupCard } from "./fragments";

export const RECENT_LIKES_QUERY = gql`
  query RecentlyLiked {
    recentlyLiked(limit: 10, skip: 0) {
      ... ContentCard
      ... GroupCard
    }
  }
  ${contentCard}
  ${groupCard}
`;

export default graphql(RECENT_LIKES_QUERY, { name: "recentLikes" });
