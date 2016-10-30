
import { PropTypes } from "react";

import AccountType from "../../../../components/accountType";

const SavedPayment = ({ account, remove }) => (
  <div
    className={
      "soft-ends text-left hard-sides outlined--light " +
      "outlined--bottom constrain-mobile"
    }
  >
    <div className="display-inline-block soft-half-ends one-whole">
      <h6 className="flush-bottom float-left">{account.name}</h6>
      <button
        className="h6 flush-bottom float-right text-alert"
        id={account.id}
        onClick={() => remove(account.id)}
      >
        Remove
      </button>
    </div>

    <h5 className="hard one-whole flush-bottom">
      {account.payment.accountNumber.slice(
        0, account.payment.accountNumber.length - 5
      ).replace(/./gmi, "*")}{account.payment.accountNumber.slice(-4)}
      <span className="float-right ">
        <AccountType width="30px" height="20px" type={account.payment.paymentType} />
      </span>
    </h5>
  </div>
);

SavedPayment.propTypes = {
  remove: PropTypes.func.isRequired,
  account: PropTypes.object.isRequired,
};

export default SavedPayment;
