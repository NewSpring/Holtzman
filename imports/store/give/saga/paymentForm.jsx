import { Component, PropTypes} from "react"

const CreditCardForm = ({ number, exp, ccv }) => (
  <fieldset>
    <input readOnly={true} name="billing-cc-number" value={number} />
    <input readOnly={true} name="billing-cc-exp" value={exp} />
    <input readOnly={true} name="billing-cvv" value={ccv} />
  </fieldset>
)

const AchForm = ({ account, routing, name, type }) => (
  <fieldset>
    <input readOnly={true} name="billing-account-number" value={account} />
    <input readOnly={true} name="billing-routing-number" value={routing} />
    <input readOnly={true} name="billing-account-name" value={name} />
    <input readOnly={true} name="billing-account-type" value={type} />
    <input readOnly={true} name="billing-entity-type" value="personal" />
  </fieldset>
)

export {
  CreditCardForm,
  AchForm
}
