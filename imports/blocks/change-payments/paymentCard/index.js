import AccountType from "../../../components/accountType";

type IPaymentCard = {
  onClick: Function,
  accountName: string,
  accountId: string,
  paymentAccount: Function,
  selectedAccountId: number,
  paymentType: string,
}

const PaymentCard = ({
  accountName,
  accountId,
  paymentAccount,
  selectedAccountId,
  paymentType,
  onClick,
}: IPaymentCard) => (
  <div style={{ position: "relative", cursor: "pointer" }} id={accountId} onClick={onClick}>
    <div className="soft-ends push-double-left text-left hard-right outlined--light outlined--bottom relative">

      <div className="display-inline-block soft-half-ends one-whole">
        <h6 className="flush-bottom float-left text-dark-tertiary">{accountName}</h6>
        {/* <button className="h6 flush-bottom float-right text-primary" id={accountId}
          onClick={onClickChoose}>Choose</button>*/}
      </div>


      <h5 className="hard one-whole flush-bottom text-dark-tertiary">
        {paymentAccount}
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
        style={{
          opacity: 0,
          position: "absolute",
          top: 0,
          left: 0,
          padding: "50px",
        }}
      />
      <label
        htmlFor={`label${accountId}`}
        style={{
          position: "absolute",
          top: "50%",
          left: 0,
        }}
      />
    </div>
  </div>
);

export default PaymentCard;
