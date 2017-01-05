// @flow

import AccountType from "../../account-type";

export const obfuscateAccount = (account: string) => {
  const accountFistEight = account.slice(0, account.length - 4).replace(/./gmi, "*");
  const accountLastFour = account.slice(-4);

  return accountFistEight + accountLastFour;
};

const cardStyle = {
  position: "relative",
  cursor: "pointer",
};

const labelStyle = {
  position: "absolute",
  top: "50%",
  left: 0,
};

const inputStyle = {
  opacity: 0,
  position: "absolute",
  top: 0,
  left: 0,
  padding: "50px",
};

type IPaymentCard = {
  onClick: Function,
  accountName: string,
  accountId: string,
  paymentAccount: string,
  selectedAccountId: string,
  paymentType: string,
}

export default ({
  accountName,
  accountId,
  paymentAccount,
  selectedAccountId,
  paymentType,
  onClick,
}: IPaymentCard) => (
  <div style={cardStyle} id={accountId} onClick={onClick}>
    <div className="soft-ends push-double-left text-left hard-right outlined--light outlined--bottom relative">

      <div className="display-inline-block soft-half-ends one-whole">
        <h6 className="flush-bottom float-left text-dark-tertiary">
          {accountName}
        </h6>
      </div>

      <h5 className="hard one-whole flush-bottom text-dark-tertiary">
        {obfuscateAccount(paymentAccount)}
        <span className="float-right soft-half-left">
          <AccountType
            width="40px"
            height="25px"
            type={paymentType}
          />
        </span>
      </h5>

    </div>

    <div className="locked-ends locked-sides">
      <input
        type="checkbox"
        id={`label${accountId}`}
        readOnly
        checked={Number(accountId) === Number(selectedAccountId)}
        style={inputStyle}
      />
      <label
        htmlFor={`label${accountId}`}
        style={labelStyle}
      />
    </div>
  </div>
);
