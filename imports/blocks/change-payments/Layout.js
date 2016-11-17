// @flow

import PaymentCard from "./paymentCard";

type ILayout = {
  savedAccounts: Object[],
  selectedAccount: Object,
  chooseAccount: Function,
  changeAccounts: Function,
}

const Layout = ({
  savedAccounts,
  selectedAccount,
  chooseAccount,
  changeAccounts,
}: ILayout) => (
  <div className="soft-double-top">
    <div className="soft-sides flush-bottom push-double-top@lap-and-up">
      <h4 className="text-center flush-bottom">
        Change Payment Account
      </h4>
    </div>
    <div className="soft">
      {savedAccounts.map((account, key) => (
        <PaymentCard
          key={key}
          onClick={chooseAccount}
          accountName={account.name}
          accountId={account.id}
          paymentAccount={account.payment.accountNumber}
          paymentType={account.payment.paymentType}
          selectedAccountId={selectedAccount.id}
        />
      ))}
      <button
        className="btn one-whole push-double-top soft-sides push-bottom"
        onClick={changeAccounts}
      >
        Change Account
      </button>

      <p>
        <small>
          <em>
            You can enter a new payment account before confirming your contribution.
          </em>
        </small>
      </p>
    </div>
  </div>
);

export default Layout;
