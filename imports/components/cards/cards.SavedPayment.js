// @flow

// NPM based imports
import { Link } from "react-router";
import AccountType from "../../components/accountType";


type ISavedPaymentCard = {
  id: string,
  name: string,
  payment: {
    accountNumber: string,
    paymentType: string,
  },
  onClick: Function,
};

// XXX right now this uses the content prop for everything
// it should less intelligent and use the other props directly
// Unused props: icon, link, type, images
const SavedPaymentCard = ({
  id,
  name,
  payment,
  onClick,
}: ISavedPaymentCard) => (
  <div className="card" onClick={onClick}>
    <div className="card__item soft push-half-ends one-whole" style={{ verticalAlign: "middle" }}>
      <h5 className="text-dark-primary capitalize">{name}</h5>
      <div className="floating text-left">
        <h6 className="text-dark-tertiary flush soft-half-right floating__item">{payment.accountNumber.slice(-4)}</h6>
        <div className="floating__item">
          <AccountType
            width="40px"
            height="25px"
            type={payment.paymentType}
          />
        </div>
      </div>
    </div>
  </div>
);

export default SavedPaymentCard;
