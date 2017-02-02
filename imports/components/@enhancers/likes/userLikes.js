import { graphql } from "react-apollo";
import gql from "graphql-tag";
import { contentCard, groupCard } from "./fragments";

export const LIKES_QUERY = gql`
  query UserLikes {
    userFeed(filters:["LIKES"]) {
      ... ContentCard
      ... GroupCard
    }
  }
  ${contentCard}
  ${groupCard}
`;

export const withLikes = graphql(LIKES_QUERY, { name: "likes", options: { forceFetch: true } });

export default withLikes;
