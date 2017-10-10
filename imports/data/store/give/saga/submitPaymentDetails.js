import "regenerator-runtime/runtime";
import React from "react";
import ReactDOM from "react-dom";

import { CreditCardForm, AchForm } from "./paymentForm";

export default function* submitPaymentDetails(data, url) {
  /*

    Oddity with NMI, when using a saved account for a subscription,
    you only submit the order, not the charge, etc

  */
  if (data.payment.type === "cc" && !data.payment.cardNumber) return;
  if (data.payment.type === "ach" && !data.payment.accountNumber) return;

  const form = document.createElement("FORM");

  let Component;
  let obj;

  const { payment, personal } = data;

  // format data and select component
  if (payment.type === "ach") {
    obj = {
      name: `${personal.firstName} ${personal.lastName}`,
      account: payment.accountNumber,
      routing: payment.routingNumber,
      type: payment.accountType,
    };

    Component = AchForm;
  } else {
    obj = {
      number: payment.cardNumber,
      exp: payment.expiration,
      ccv: payment.ccv,
    };

    Component = CreditCardForm;
  }

  // create the fieldset
  const FieldSet = React.createElement(Component, { ...obj });
  // add fieldset to non rendered form
  ReactDOM.render(FieldSet, form);

  // @TODO test on older browsers
  // store data in NMI's system
  // eslint-disable-next-line
  yield fetch(url, {
    method: "POST",
    body: new FormData(form),
    mode: "no-cors",
  }).catch(() => {
    // @TODO error handling
  });
}
