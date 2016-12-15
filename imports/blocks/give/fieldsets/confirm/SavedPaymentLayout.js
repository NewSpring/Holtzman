
// @flow

import SavedAccount from "../shared/SavedAccount";
import { AccountNumber, Icon, cardType } from "../shared/";

type IHeader = {
  override?: React$Element<any>,
};

const Header = ({ override }: IHeader) => {
  if (override) return override;
  return (
    <h4 className="text-center">
      Review
    </h4>
  );
};

type ISavedPaymentLayout = {
  data: Object,
  header: any,
  children: any,
  goToStepOne: Function,
};

export default ({ data, header, children, goToStepOne }: ISavedPaymentLayout) => {
  const payment = {
    type: data.payment.cardNumber ? "cc" : "ach",
    cardNumber: data.payment.cardNumber || data.payment.accountNumber,
  }
  return (
    <div>
      <div className="push-double@lap-and-up push">
        <Header override={header} />
      </div>

      {children}

      <div className="soft-sides text-left">

        <h7 className="display-block text-dark-tertiary">Billing Address</h7>
        <h6>{data.billing.streetAddress}</h6>
        <h6>{`${data.billing.city}, ${data.billing.state} ${data.billing.zip}`}</h6>

        <hr />

        <h7 className="display-block text-dark-tertiary">Account Details</h7>
        <h6>
          <AccountNumber accountNumber={data.payment.cardNumber || data.payment.accountNumber} />
          &nbsp;&nbsp;
          <Icon width="19px" height="12px" cardType={cardType(payment, null)}/>
        </h6>
        <h6>{data.payment.expiration || data.payment.routingNumber}</h6>
        <h6>{data.payment.ccv}</h6>
        <h6>{data.payment.name}</h6>

        <hr />

        <button className="btn one-whole push-double-top soft-sides push-half-bottom" onClick={() => {}}>
          Create Account
        </button>

        <div className="text-center">
          <h6
            className="outlined--light outlined--bottom display-inline-block text-dark-tertiary"
            style={{ cursor: "pointer" }}
            onClick={goToStepOne}
          >
            Edit Details
          </h6>
        </div>
      </div>
    </div>
  );
};
