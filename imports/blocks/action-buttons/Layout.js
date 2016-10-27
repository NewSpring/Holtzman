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
}

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
}

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
}

const Layout = (props) => (
  <span>
    <PrimaryButton
      theme={props.theme}
      classes={props.classes}
      text={props.text}
      onClick={props.onClick}
      value={props.value}
      style={props.style || {}}
      dataId={props.dataId}
      savedPayments={props.savedPayments}
      hideCard={props.hideCard}
      getAccount={props.getAccount}
      disabled={props.disabled}
    />
    <SecondaryLayout
      authorized={props.authorized}
      register={props.register}
    />
    <TertiaryLayout
      disabledGuest={props.disabledGuest}
      disabled={props.disabled}
      giveAsGuest={props.giveAsGuest}
    />
    <ChangePaymentsLayout
      savedPayments={props.savedPayments}
      hideCard={props.hideCard}
      changePayments={props.changePayments}
    />
  </span>
);

export default Layout;



