// @flow
import AccountType from "../../../account-type";
import { AccountNumber } from "./";

type ISavedAccount = {
  account: Object,
  choose: Function,
  savedAccount: Object,
};

const SavedAccount = ({
  account,
  choose,
  savedAccount,
}: ISavedAccount) => (
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

export default SavedAccount;
