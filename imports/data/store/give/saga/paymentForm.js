import PropTypes from 'prop-types';

const CreditCardForm = ({ number, exp, ccv }) => (
  <fieldset>
    <input readOnly name="billing-cc-number" value={number} />
    <input readOnly name="billing-cc-exp" value={exp} />
    {ccv && <input readOnly name="billing-cvv" value={ccv} />}
  </fieldset>
);

CreditCardForm.propTypes = {
  number: PropTypes.string.isRequired,
  exp: PropTypes.string.isRequired,
  ccv: PropTypes.string,
};

const AchForm = ({ account, routing, name, type }) => (
  <fieldset>
    <input readOnly name="billing-account-number" value={account} />
    <input readOnly name="billing-routing-number" value={routing} />
    <input readOnly name="billing-account-name" value={name} />
    <input readOnly name="billing-account-type" value={type} />
    <input readOnly name="billing-entity-type" value="personal" />
  </fieldset>
);

AchForm.propTypes = {
  account: PropTypes.string.isRequired,
  routing: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export {
  CreditCardForm,
  AchForm,
};
