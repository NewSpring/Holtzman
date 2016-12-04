// @flow

// $FlowMeteor
import { Meteor } from "meteor/meteor";

import {
  PrimaryButton,
  SecondaryButton,
  Guest as TertiaryButton,
} from "./buttons";

type ISecondaryLayout = {
  authorized: boolean,
  register: Function,
};

const SecondaryLayout = ({ authorized, register }: ISecondaryLayout) => {
  if (!authorized && !Meteor.userId()) {
    return (
      <SecondaryButton
        onClick={register}
      />
    );
  }
  return null;
};

type ITertiaryLayout = {
  disabled: boolean,
  disabledGuest: boolean,
  giveAsGuest: Function,
};

const TertiaryLayout = ({
  disabledGuest,
  disabled,
  giveAsGuest,
}: ITertiaryLayout) => {
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

type IChangePaymentsLayout = {
  changePayments: Function,
  hideCard: boolean,
  savedPayments: Object[],
};

const ChangePaymentsLayout = ({
  savedPayments,
  hideCard,
  changePayments,
}: IChangePaymentsLayout) => {
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

type ILayout = {
  authorized: boolean,
  classes: string,
  dataId: string,
  disabled: boolean,
  disabledGuest: boolean,
  getAccount: Function,
  giveAsGuest: Function,
  hideCard: boolean,
  onClick: Function,
  register: Function,
  savedPayments: Object[],
  style: Object,
  theme: string,
  text: string,
  value: string,
};

const Layout = ({
  authorized,
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
}: ILayout) => (
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
  </span>
);


export default Layout;

export {
  SecondaryLayout,
  TertiaryLayout,
  ChangePaymentsLayout,
};
