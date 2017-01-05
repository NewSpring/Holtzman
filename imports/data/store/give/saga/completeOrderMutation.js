import gql from "graphql-tag";

export default gql`
  mutation completeOrder($token: ID!, $name: String, $id: ID) {
    response: completeOrder(token: $token, accountName: $name, scheduleId: $id) {
      error
      success
      code
    }
  }
`;
