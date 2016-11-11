import { PropTypes } from "react";

const PaymentOptions = ({
  back,
  changeAccounts,
  goToStepOne,
  savedAccount,
}) => {
  if (savedAccount.id === null) {
    /* eslint-disable */
    return (
      <div className="display-block soft-top text-left">
        <h6
          className="outlined--light outlined--bottom display-inline-block text-dark-tertiary"
          style={{ cursor: "pointer" }}
          onClick={back}
        >
          Edit Contribution Details
        </h6>
      </div>
    );
  }
  return (
    <div className="display-block soft-top text-left">
      <h6
        className="outlined--light outlined--bottom display-inline-block text-dark-tertiary"
        style={{ cursor: "pointer" }}
        onClick={changeAccounts}
      >
        Change Payment Accounts
      </h6>
      <br />
      <h6
        className="outlined--light outlined--bottom display-inline-block text-dark-tertiary"
        style={{ cursor: "pointer" }}
        onClick={goToStepOne}
      >
        Enter New Payment
      </h6>
    </div>
  );
};

PaymentOptions.propTypes = {
  back: PropTypes.func,
  changeAccounts: PropTypes.func,
  goToStepOne: PropTypes.func,
  savedAccount: PropTypes.object,
};

export default PaymentOptions;
