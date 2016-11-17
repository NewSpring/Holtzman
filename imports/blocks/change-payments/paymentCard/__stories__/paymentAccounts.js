import PaymentCard from "../index";

type IPaymentAccounts = {
  savedAccounts: Object,
}

// XXX Need to refactor this to get it to work
const choose = (e: SyntheticInputEvent) => {
  e.preventDefault();

  const { id } = e.currentTarget;
  // XXX 'any' is not a specific enough type
  let act: any = {};
  for (const account of this.props.savedAccounts) {
    if (Number(account.id) === Number(id)) {
      act = account;
      break;
    }
  }

  this.setState({
    savedAccount: act,
  });
};

const PaymentAccounts = ({
  savedAccounts,
}: IPaymentAccounts) => (
  <div>
    {savedAccounts.map((account, key) => (
      <PaymentCard
        key={key}
        onClick={choose}
        accountName={account.name}
        accountId={account.id}
        paymentAccount={account.payment.accountNumber}
        paymentType={account.payment.paymentType}
        // selectedAccountId={selectedAccount.id}
      />
    ))}
  </div>
);

export default PaymentAccounts;
