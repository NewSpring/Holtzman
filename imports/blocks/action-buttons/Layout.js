import { PropTypes } from "react";

import {
  PrimaryButton,
  SecondaryButton,
  Guest as TertiaryButton,
} from "./buttons";

const SecondaryLayout = ({ authorized, register }) => {
  if (!authorized && !Meteor.userId()) {
    return (
      <SecondaryButton
        onClick={register}
      />
    );
  }
  return null;
};

SecondaryLayout.propTypes = {
  authorized: PropTypes.bool,
  register: PropTypes.func,
};

const TertiaryLayout = ({ disabledGuest, disabled, giveAsGuest }) => {
  if (!disabledGuest && !Meteor.userId()) {
    return (
      <TertiaryButton
        disabled={disabled}
        onClick={giveAsGuest}
      />
    );
  }
  return null;
};

TertiaryLayout.propTypes = {
  disabled: PropTypes.bool,
  disabledGuest: PropTypes.bool,
  giveAsGuest: PropTypes.func,
};

const ChangePaymentsLayout = ({ savedPayments, hideCard, changePayments }) => {
  if (savedPayments && savedPayments.length && !hideCard && Meteor.userId()) {
    return (
      <TertiaryButton
        onClick={changePayments}
        text={"Change payment account"}
      />
    );
  }
  return null;
};

ChangePaymentsLayout.propTypes = {
  changePayments: PropTypes.func,
  hideCard: PropTypes.bool,
  savedPayments: PropTypes.array,
};

const Layout = ({
  authorized,
  changePayments,
  classes,
  dataId,
  disabled,
  disabledGuest,
  getAccount,
  giveAsGuest,
  hideCard,
  onClick,
  register,
  savedPayments,
  style,
  theme,
  text,
  value,
}) => (
  <span>
    <PrimaryButton
      theme={theme}
      classes={classes}
      text={text}
      onClick={onClick}
      value={value}
      style={style || {}}
      dataId={dataId}
      savedPayments={savedPayments}
      hideCard={hideCard}
      getAccount={getAccount}
      disabled={disabled}
    />
    <SecondaryLayout
      authorized={authorized}
      register={register}
    />
    <TertiaryLayout
      disabledGuest={disabledGuest}
      disabled={disabled}
      giveAsGuest={giveAsGuest}
    />
    <ChangePaymentsLayout
      savedPayments={savedPayments}
      hideCard={hideCard}
      changePayments={changePayments}
    />
  </span>
);

Layout.propTypes = {
  authorized: PropTypes.bool,
  changePayments: PropTypes.func,
  classes: PropTypes.array,
  dataId: PropTypes.string,
  disabled: PropTypes.bool,
  disabledGuest: PropTypes.bool,
  getAccount: PropTypes.func,
  giveAsGuest: PropTypes.func,
  hideCard: PropTypes.bool,
  onClick: PropTypes.func,
  register: PropTypes.func,
  savedPayments: PropTypes.array,
  style: PropTypes.object,
  theme: PropTypes.string,
  text: PropTypes.string,
  value: PropTypes.string,
};

export default Layout;
