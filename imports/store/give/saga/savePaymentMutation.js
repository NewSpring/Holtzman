import gql from "graphql-tag";

export default gql`
  mutation savePayment($token: ID!, $name: String!, $id: String) {
    response: savePayment(token: $token, accountName: $name, gateway: $id) {
      error
      success
      code
      savedPayment {
        id: entityId
        name
        payment {
          accountNumber
          paymentType
        }
      }
    }
  }
`;
