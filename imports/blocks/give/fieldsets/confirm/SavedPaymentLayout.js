
// @flow

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
  billing: Object,
  payment: Object,
  header: any,
  children: any,
  goToStepOne: Function,
};

export default ({
  billing,
  payment,
  header,
  children,
  goToStepOne,
}: ISavedPaymentLayout) => {
  if (!billing || !payment) return null;
  const paymentInfo = {
    type: payment.cardNumber ? "cc" : "ach",
    cardNumber: payment.cardNumber || payment.accountNumber,
  };
  return (
    <div>
      <div className="push-double@lap-and-up push">
        <Header override={header} />
      </div>

      {children}

      <div className="soft-sides text-left">

        <h7 className="display-block text-dark-tertiary">Billing Address</h7>
        <h6>{billing.streetAddress}</h6>
        <h6>{`${billing.city}, ${billing.state} ${billing.zip}`}</h6>

        <hr />

        <h7 className="display-block text-dark-tertiary">Account Details</h7>
        <h6>
          <AccountNumber accountNumber={payment.cardNumber || payment.accountNumber} />
          &nbsp;&nbsp;
          <Icon width="19px" height="12px" cardType={cardType(paymentInfo, null)} />
        </h6>
        <h6>{payment.expiration || payment.routingNumber}</h6>
        <h6>{payment.ccv}</h6>
        <h6>{payment.name}</h6>

        <hr />

        <button className="btn one-whole push-double-top soft-sides push-half-bottom" type="submit">
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
