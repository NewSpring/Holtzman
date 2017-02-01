import { graphql } from "react-apollo";
import gql from "graphql-tag";
import { contentCard, groupCard } from "./fragments";

const LIKES_QUERY = gql`
  {
    userFeed(filters:["LIKES"]) {
      ... ContentCard
      ... GroupCard
    }
  }
  ${contentCard}
  ${groupCard}
`;

const withLikes = graphql(LIKES_QUERY, { name: "likes" });

export default withLikes;
