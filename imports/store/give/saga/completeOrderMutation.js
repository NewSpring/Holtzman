import gql from "graphql-tag";

export default gql`
  mutation completeOrder($token: String!, $id: ID, $name: String) {
    response: completeOrder(token: $token, id: $id, name: $name) {
      error
      success
      code
    }
  }
`;
