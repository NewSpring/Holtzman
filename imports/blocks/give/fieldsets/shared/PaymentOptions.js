// @flow

type IPaymentOptions = {
  changeAccounts: Function,
  savedAccount: Object,
};

const PaymentOptions = ({
  changeAccounts,
  savedAccount,
}: IPaymentOptions) => {
  if (savedAccount.id === null) return null;

  return (
    <div className="display-block soft-half-top text-center">
      <h6
        className="outlined--light outlined--bottom display-inline-block text-dark-tertiary"
        style={{ cursor: "pointer" }}
        onClick={changeAccounts}
      >
        Change Payment Accounts
      </h6>
    </div>
  );
};

export default PaymentOptions;
