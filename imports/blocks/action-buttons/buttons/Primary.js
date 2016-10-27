
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

const ButtonText = ({ overrideText, savedPayments, hideCard, getAccount }) => {
  let text = overrideText || "Give Now";

  if (!Meteor.userId()) text = "Sign In";

  if (savedPayments && savedPayments.length && !hideCard) {
    const details = getAccount();
    if (details && details.payment && details.payment.accountNumber) {
      let { accountNumber } = details.payment;
      accountNumber = accountNumber.slice(-4).trim();
      text = `Review Using ${accountNumber}`;
    }
  }

  return <span>{text}</span>;
};

const Icon = ({ savedPayments, hideCard, getAccount }) => {
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
    disabled={Meteor.userId() && disabled}
    value={value}
    data-id={dataId}
    style={style}
  >
    <ButtonText {...{ overrideText: text, savedPayments, hideCard, getAccount }} />
    {" "}
    <Icon {...{ savedPayments, hideCard, getAccount }} />
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
