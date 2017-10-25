import "regenerator-runtime/runtime";
import React from "react";
import ReactDOM from "react-dom";
import { put, call } from "redux-saga/effects";

import { GraphQL } from "../../../graphql";

import actions from "../actions";

import { CreditCardForm } from "./paymentForm";
import formatPersonDetails from "./formatPersonDetails";
import CREATE_ORDER_MUTATION from "./createOrderMutation";

export default function* submitPersonDetails(give, autoSubmit) {
  // personal info is ready to be submitted
  const formattedData = formatPersonDetails(give);
  /*

    Oddity with NMI, when using a saved account for a subscription,
    you only submit the order, not the charge, etc

  */
  if (formattedData.savedAccount && give.schedule.start) {
    return;
  }

  let url;
  try {
    // call the Heighliner mutation to submit data to NMI
    const { data: { response } } = yield call(GraphQL.mutate, {
      mutation: CREATE_ORDER_MUTATION,
      variables: {
        data: JSON.stringify(formattedData),
        id: null,
        instant: false,
      },
    });
    // if (response.error) error = response.error;
    url = response.url;
  } catch (e) {
    /* eslint-disable-line */
  }

  if (autoSubmit) {
    /*

      @NOTE
        This is a hacky way to get around the submission required
        by transnational gateway. We do a POST into the dark web of
        NMI servers

      @NOTE
        This will always throw an error but we just catch it and ignore

      @NOTE
        DO NOT REMOVE THIS

    */
    // DONT REMOVE
    // submit empty payment details to nmi
    // fixes nasty IE / old browser / security bug
    const form = document.createElement("FORM");
    // create the fieldset
    const FieldSet = React.createElement(CreditCardForm, {
      number: "",
      exp: "",
    });
    // add fieldset to non rendered form
    ReactDOM.render(FieldSet, form);

    // eslint-disable-next-line
    yield fetch(url, {
      method: "POST",
      body: new FormData(form),
      mode: "no-cors",
    }).catch(() => {
      // console.log("error dark", error);
    });
  }

  // update the store with the url
  yield put(actions.setDetails(url));
}
