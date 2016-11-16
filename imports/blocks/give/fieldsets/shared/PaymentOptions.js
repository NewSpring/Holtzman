// @flow

type IPaymentOptions = {
  back: Function,
  changeAccounts: Function,
  goToStepOne: Function,
  savedAccount: Object,
};

const PaymentOptions = ({
  back,
  changeAccounts,
  goToStepOne,
  savedAccount,
}: IPaymentOptions) => {
  if (savedAccount.id === null) {
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

export default PaymentOptions;
