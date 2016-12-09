// @flow

// NPM based imports
import AccountType from "../../components/accountType";

type ISavedPaymentCard = {
  payment: Object,
  onClick: Function,
};

// XXX right now this uses the content prop for everything
// it should less intelligent and use the other props directly
// Unused props: icon, link, type, images
const SavedPaymentCard = ({
  payment,
  onClick,
}: ISavedPaymentCard) => (
  <div className="card" onClick={onClick}>
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
);

export default SavedPaymentCard;
