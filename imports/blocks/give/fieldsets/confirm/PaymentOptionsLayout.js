// @flow

import { SavedAccount } from "../shared";

const Header = () => (
  <h4 className="text-center flush-bottom">
    Change Payment Account
  </h4>
);

type IPaymentOptionsLayout = {
  changeAccounts: Function,
  choose: Function,
  goToStepOne: Function,
  savedAccount: Object,
  savedAccounts: Object[],
};

const PaymentOptionsLayout = ({
  changeAccounts,
  choose,
  goToStepOne,
  savedAccount,
  savedAccounts,
}: IPaymentOptionsLayout) => (
  <div>
    <div className="soft-sides flush-bottom push-double-top@lap-and-up">
      <Header />
    </div>

    <div className="soft-sides">
      {savedAccounts.map((account, key) => (
        <SavedAccount
          account={account}
          choose={choose}
          key={key}
          savedAccount={savedAccount}
        />
      ))}

      <button className="btn one-whole push-double-top soft-sides push-half-bottom" onClick={changeAccounts}>
        Save and Continue
      </button>

      <button className="btn--small btn--dark-tertiary one-whole soft-sides push-half-ends" onClick={goToStepOne}>
        Enter New Payment
      </button>

    </div>
  </div>
);

export default PaymentOptionsLayout;
