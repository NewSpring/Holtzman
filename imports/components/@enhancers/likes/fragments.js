
import gql from "graphql-tag";

export const contentCard = gql`
  fragment ContentCard on Content {
    __typename
    id
    title
    channelName
    content {
      images(sizes: ["SMALL", "MEDIUM"]) {
        url
        label
      }
    }
  }
`;

export const groupCard = gql`
  fragment GroupCard on Group {
    __typename
    id
    name
    photo
  }
`;
