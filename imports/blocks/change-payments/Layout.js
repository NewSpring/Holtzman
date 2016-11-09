
import { Component, PropTypes } from "react";

import PaymentCard from "./paymentCard";

const paymentAccount = (account) => {
  const accountFistEight = account.payment.accountNumber.slice(0, account.payment.accountNumber.length - 5).replace(/./gmi, "*");
  const accountLastFour = account.payment.accountNumber.slice(-4);

  return accountFistEight + accountLastFour;
};

export default class Layout extends Component {

  static propTypes = {
    savedAccounts: PropTypes.array,
    selectedAccount: PropTypes.string,
    chooseAccount: PropTypes.func,
    changeAccounts: PropTypes.func,
  }

  render() {
    const {
      savedAccounts,
      selectedAccount,
      chooseAccount,
      changeAccounts,
    } = this.props;
    return (
      <div className="soft-double-top">
        <div className="soft-sides flush-bottom push-double-top@lap-and-up">
          <h4 className="text-center flush-bottom">
            Change Payment Account
          </h4>
        </div>

        <div className="soft">
          { savedAccounts.map((account, key) => (
            <PaymentCard
              key={key}
              onClick={chooseAccount}
              accountId={account.id}
              paymentAccount={paymentAccount(account)}
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

          <p >
            <small>
              <em>
                You can enter a new payment account before confirming your contribution.
              </em>
            </small>
          </p>
        </div>
      </div>
    );
  }
}
