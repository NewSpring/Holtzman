import { PropTypes } from "react";
import { SavedAccount } from "../shared";

const Header = () => (
  <h4 className="text-center flush-bottom">
    Change Payment Account
  </h4>
);

const PaymentOptionsLayout = ({
  changeAccounts,
  choose,
  goToStepOne,
  savedAccount,
  savedAccounts,
}) => (
  <div>
    <div className="soft-sides flush-bottom push-double-top@lap-and-up">
      <Header />
    </div>

    <div className="soft">
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

PaymentOptionsLayout.propTypes = {
  changeAccounts: PropTypes.func,
  choose: PropTypes.func,
  goToStepOne: PropTypes.func,
  savedAccount: PropTypes.object,
  savedAccounts: PropTypes.array,
};

export default PaymentOptionsLayout;
