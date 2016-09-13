import { Component, PropTypes } from "react";

const CreditCardForm = ({ number, exp, ccv }) => (
  <fieldset>
    <input readOnly name="billing-cc-number" value={number} />
    <input readOnly name="billing-cc-exp" value={exp} />
    <input readOnly name="billing-cvv" value={ccv} />
  </fieldset>
);

const AchForm = ({ account, routing, name, type }) => (
  <fieldset>
    <input readOnly name="billing-account-number" value={account} />
    <input readOnly name="billing-routing-number" value={routing} />
    <input readOnly name="billing-account-name" value={name} />
    <input readOnly name="billing-account-type" value={type} />
    <input readOnly name="billing-entity-type" value="personal" />
  </fieldset>
);

export {
  CreditCardForm,
  AchForm,
};
