// @flow

import { graphql } from "react-apollo";
import gql from "graphql-tag";

import SavedPaymentCard from "../../../components/cards/cards.SavedPayment";

export const REMOVE_PAYMENT_MUTATION = gql`
  mutation RemoveSavedPayment($id: Int!) {
    cancelSavedPayment(entityId: $id) {
      error
      code
      success
    }
  }
`;

export const updateQuery = (id) => (prev, { mutationResult }) => {
  const { error } = mutationResult.data.cancelSavedPayment;
  if (error) return prev;
  let index;
  prev.savedPayments.forEach((payment, i) => {
    if (payment.id === id) index = i;
  });

  prev.savedPayments.splice(index, 1);
  return prev;
};

export const withPaymentRemove = graphql(REMOVE_PAYMENT_MUTATION, {
  props: ({ mutate }) => ({
    remove: (id) => mutate({
      variables: { id },
      optimisticResponse: {
        __typename: "Mutation",
        cancelSavedPayment: {
          error: null,
          code: null,
          success: true,
          __typename: "SavePaymentMutationResponse",
        },
      },
      updateQueries: {
        GivingDashboard: updateQuery(id),
        GetSavedPaymentAccounts: updateQuery(id),
      },
    }),
  }),
});

type IWithPaymentRemove = {
  payment: Object,
  remove: Function,
};

export default withPaymentRemove(({ payment, remove }: IWithPaymentRemove) => (
  <SavedPaymentCard
    classes={"grid__item one-whole one-half@anchored"}
    key={`${payment.id}_${payment.name}`}
    payment={payment}
    onClick={() => remove(payment.id)}
  />
));

