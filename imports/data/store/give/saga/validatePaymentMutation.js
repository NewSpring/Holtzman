import gql from "graphql-tag";

export default gql`
  mutation ValidateCard ($token: ID!) {
    response: validate(token: $token) {
      error
      success
      code
    }
  }
`;
