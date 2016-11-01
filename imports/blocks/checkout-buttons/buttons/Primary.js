// @flow

// $FlowMeteor
import { Meteor } from "meteor/meteor";

import AccountType from "../../../components/accountType";

const buttonClasses = (
  savedPayments: Object[],
  disabled: boolean,
  additionalClasses: string
): string => {
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

type IButtonText = {
  overrideText: string,
  savedPayments: Object[],
  hideCard: boolean,
  getAccount: Function,
};

const ButtonText = ({
  overrideText,
  savedPayments,
  hideCard,
  getAccount,
}: IButtonText) => {
  let text: string = overrideText || "Give Now";

  if (!Meteor.userId()) text = "Sign In";

  if (savedPayments && savedPayments.length && !hideCard) {
    const details: Object = getAccount();
    if (details && details.payment && details.payment.accountNumber) {
      let { accountNumber }: { accountNumber: string } = details.payment;
      accountNumber = accountNumber.slice(-4).trim();
      text = `Review Using ${accountNumber}`;
    }
  }

  return <span>{text}</span>;
};

type IIcon = {
  getAccount: Function,
  hideCard: boolean,
  savedPayments: Object[],
};

const Icon = ({
  savedPayments,
  hideCard,
  getAccount,
}: IIcon) => {
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

type IPrimaryButton = {
  classes: string,
  dataId: string,
  disabled: boolean,
  hideCard: boolean,
  getAccount: Function,
  onClick: Function,
  savedPayments: Object[],
  style: Object,
  text: string,
  theme: string,
  value: string,
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
}: IPrimaryButton) => (

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

export default PrimaryButton;
