
// @flow

import { Link } from "react-router";

type ISmallButton = {
  linkUrl?: string,
  onClick?: Function,
  disabled?: Boolean,
  text: String,
  className?: string,
  style?: Object,
};

const SmallButton = (props: ISmallButton) => {
  const classes = `
    btn btn--small@next
    ${props.disabled ? "btn--disabled" : ""}
    ${props.className || ""}
  `;

  if (props.linkUrl) {
    return (
      <Link
        className={classes}
        style={props.style || {}}
        onClick={props.onClick}
        to={props.linkUrl}
      >
        {props.text}
      </Link>
    );
  }
  return (
    <button
      className={classes}
      style={props.style || {}}
      onClick={props.onClick}
    >
      {props.text}
    </button>
  );
};

export default SmallButton;
