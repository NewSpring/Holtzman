// @flow

// $FlowMeteor
import { Meteor } from "meteor/meteor";

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


type IPrimaryButton = {
  classes: string,
  dataId: string,
  disabled: boolean,
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
}: IPrimaryButton) => {
  let message: string = text || "Review Contribution";
  if (!Meteor.userId()) message = "Sign In";
  return (
    <button
      className={theme || buttonClasses(savedPayments, disabled, classes)}
      onClick={onClick}
      disabled={Meteor.userId() && disabled}
      value={value}
      data-id={dataId}
      style={style}
      id="sign-in-button"
    >
      {message} {Meteor.userId() && <span className="icon-lock" />}
    </button>
  );
};

export default PrimaryButton;

export {
  buttonClasses,
};
