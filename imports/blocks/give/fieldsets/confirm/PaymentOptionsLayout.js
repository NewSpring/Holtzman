import { PropTypes } from "react";
import AccountType from "../../../../components/accountType";

const Header = () => (
  <h4 className="text-center flush-bottom">
    Change Payment Account
  </h4>
);

const AccountNumber = ({ accountNumber }) => (
  <span>
    {accountNumber
      .slice(0, accountNumber.length - 5)
      .replace(/./gmi, "*")
    }
    {accountNumber.slice(-4)}
  </span>
);

AccountNumber.propTypes = {
  accountNumber: PropTypes.string,
};

const SavedAccount = ({
  account,
  choose,
  savedAccount,
}) => (
  <div
    style={{ position: "relative", cursor: "pointer" }}
    id={account.id}
    onClick={choose}
  >
    <div
      className={
        "soft-ends push-double-left text-left hard-right " +
        "outlined--light outlined--bottom relative"
      }
    >
      <div className="display-inline-block soft-half-ends one-whole">
        <h6 className="flush-bottom float-left text-dark-tertiary">
          {account.name}
        </h6>
      </div>

      <h5 className="hard one-whole flush-bottom text-dark-tertiary">
        <AccountNumber accountNumber={account.payment.accountNumber} />
        <span className="float-right soft-half-left">
          <AccountType
            width="40px"
            height="25px"
            type={account.payment.paymentType}
          />
        </span>
      </h5>
    </div>
    <div className="locked-ends locked-sides">
      <input
        type="checkbox"
        id={`label${account.id}`}
        readOnly
        checked={Number(account.id) === Number(savedAccount.id)}
        style={{
          opacity: 0,
          position: "absolute",
          top: 0,
          left: 0,
          padding: "50px",
        }}
      />
      <label
        htmlFor={`label${account.id}`}
        style={{
          position: "absolute",
          top: "50%",
          left: 0,
        }}
      />
    </div>
  </div>
);

SavedAccount.propTypes = {
  account: PropTypes.object,
  choose: PropTypes.func,
  savedAccount: PropTypes.object,
};

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
