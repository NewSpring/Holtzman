// @flow

// NPM based imports
import AccountType from "../../components/accountType";

type ISavedPaymentCard = {
  payment: Object,
  onClick: Function,
  classes: string,
};

// XXX this markup seems overly complex?
const SavedPaymentCard = ({
  payment,
  onClick,
  classes,
}: ISavedPaymentCard) => (
  <div style={{ cursor: "pointer" }} className={`${classes || ""}`} onClick={onClick}>
    <div className="card">
      <div className="card__item soft push-half-ends one-whole" style={{ verticalAlign: "middle" }}>
        <div className="floating grid">
          <div className="floating__item grid__item two-thirds text-left">
            <h5 className="text-dark-primary capitalize push-half-bottom">{payment.name}</h5>
            <div className="floating text-left">
              <h6 className="text-dark-tertiary flush soft-half-right floating__item">{payment.payment.accountNumber.slice(-4)}</h6>
              <div className="floating__item">
                <AccountType
                  width="40px"
                  height="25px"
                  type={payment.payment.paymentType}
                />
              </div>
            </div>
          </div>
          <div className="floating__item grid__item one-third text-right">
            <i className="icon-arrow-next" />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default SavedPaymentCard;
