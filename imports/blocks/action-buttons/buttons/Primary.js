
import { PropTypes } from "react";

import AccountType from "../../../components/accountType";

const buttonClasses = (savedPayments, disabled, additionalClasses) => {
  let classes = ["btn"];

  if (savedPayments) {
    classes.push("has-card");
  }

  if (disabled && Meteor.userId()) {
    classes.push("btn--disabled");
  }

  if (additionalClasses) {
    classes = classes.concat(additionalClasses);
  }

  return classes.join(" ");
};

const buttonText = (overrideText, savedPayments, hideCard, getAccount) => {
  if (!Meteor.userId()) return "Sign In";

  const text = overrideText || "Give Now";

  if (savedPayments && savedPayments.length && !hideCard) {
    const details = getAccount();
    if (details && details.payment && details.payment.accountNumber) {
      let { accountNumber } = details.payment;
      accountNumber = accountNumber.slice(-4).trim();
      return `Review Using ${accountNumber}`;
    }
  }

  return text;
};

const getIcon = (savedPayments, hideCard, getAccount) => {
  if (savedPayments && !hideCard) {
    // const detail = this.props.savedAccount[Object.keys(this.props.savedAccount)[0]]
    const detail = getAccount();
    if (detail.payment && detail.payment.paymentType === "ACH") {
      return (
        <AccountType width="30px" height="21px" type="Bank" />
      );
    } else if (detail.payment && detail.payment.paymentType) {
      return (
        <AccountType width="30px" height="21px" type={detail.payment.paymentType} />
      );
    }
  }
  return null;
};

const PrimaryButton = ({
  disabled,
  classes,
  onClick,
  text,
  value,
  style,
  dataId,
  savedPayments,
  theme,
  hideCard,
  getAccount,
}) => (

  <button
    className={theme || buttonClasses(savedPayments, disabled, classes)}
    onClick={onClick}
    disabled={disabled}
    value={value}
    data-id={dataId}
    style={style}
  >
    {buttonText(text, savedPayments, hideCard, getAccount)} {getIcon(savedPayments, hideCard, getAccount)}
  </button>

);

PrimaryButton.propTypes = {
  disabled: PropTypes.func,
  classes: PropTypes.string,
  onClick: PropTypes.func,
  text: PropTypes.string,
  value: PropTypes.string,
  style: PropTypes.string,
  dataId: PropTypes.string,
};

export default PrimaryButton;
