
import "regenerator-runtime/runtime";
import { select, call } from "redux-saga/effects";

import { GraphQL } from "../../../graphql";

import formatPersonDetails from "./formatPersonDetails";
import CREATE_ORDER_MUTATION from "./createOrderMutation";
import VALIDATE_CARD_MUTATON from "./validatePaymentMutation";
import submitPaymentDetails from "./submitPaymentDetails";

// at this point in time we have to do steps 1 - 3 of the
// three step process to create a validation response
// this validation process is required to ensure that the account
// that is being used to make payments, is actually valid
// see https://github.com/NewSpring/Apollos/issues/439 for discussion

export default function* validate() {
  const { give } = yield select();

  let success = true;
  let validationError = false;

  // we strip all product and schedule data so the validation is
  // just of the personal details + billing address
  const modifiedGive = { ...give };
  delete modifiedGive.transactions;
  delete modifiedGive.schedule;


  // step 1 (sumbit personal details)
  // personal info is ready to be submitted
  const formattedData = formatPersonDetails(modifiedGive);

  // in order to make this a validation call, we need to set the amount
  // to be 0
  formattedData.amount = 0;

  let error;
  let url;
  try {
    // call the Meteor method to submit data to NMI
    const { data: { response } } = yield call(GraphQL.mutate, {
      mutation: CREATE_ORDER_MUTATION,
      variables: {
        data: JSON.stringify(formattedData),
        id: null,
        instant: false,
      },
    });
    url = response.url;
  } catch (e) { error = e; }

  // step 2 (submit payment details)
  yield submitPaymentDetails(modifiedGive.data, url);

  if (url) {
    // step 3 (trigger validation)
    const token = url.split("/").pop();
    const result = yield call(GraphQL.mutate, {
      mutation: VALIDATE_CARD_MUTATON,
      variables: { token },
    });
    if (result && result.data) {
      const { response } = result.data;
      if (response.error) {
        validationError = response.error;
        success = false;
      }
    }
  } else {
    success = false;
    validationError = error;
  }

  return {
    success,
    validationError,
  };
}
