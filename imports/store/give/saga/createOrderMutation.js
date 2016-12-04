import gql from "graphql-tag";

export default gql`
  mutation order($data: String!, $id: ID, $instant: Boolean) {
    response: createOrder(data: $data, id: $id, instant: $instant) {
      url
      error
      success
      code
      transactionId
    }
  }
`;
