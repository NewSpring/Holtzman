import { PropTypes } from "react";

const PrimaryButton = ({ disabled, classes, onClick, text, icon, value, style, dataId }) => (

  <button
    className={classes}
    onClick={onClick}
    disabled={disabled}
    value={value}
    data-id={dataId}
    style={style}
  >
    {text} {icon}
  </button>

);

PrimaryButton.propTypes = {
  disabled: PropTypes.func,
  classes: PropTypes.string,
  onClick: PropTypes.func,
  text: PropTypes.string,
  icon: PropTypes.string,
  value: PropTypes.string,
  style: PropTypes.string,
  dataId: PropTypes.string,
};

const SecondaryButton = ({ disabled, onClick }) => {
  const classes = [
    "btn--thin",
    "btn--small",
    "display-inline-block",
    "push-left@lap-and-up",
    "push-half-left@handheld",
  ];
  let style = {};

  if (disabled) {
    classes.push("btn--disabled");
    // this should be fixed in junction
    style = {
      backgroundColor: "transparent !important", // handle hover :(
    };
  } else {
    classes.push("btn--dark-tertiary");
  }

  return (
    <button
      style={style}
      disabled={disabled}
      className={classes.join(" ")}
      onClick={onClick}
    >
      Register
    </button>
  );
};

SecondaryButton.propTypes = {
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
};

const Guest = ({ disabled, onClick, text }) => {
  const classes = [
    "outlined--bottom",
    "outlined--light",
  ];

  let style = {
    display: "inline",
  };

  if (disabled) {
    classes.push("text-light-tertiary");
    style = { ...style, ...{ cursor: "text" } };
  } else {
    classes.push("text-dark-tertiary");
    style = { ...style, ...{ cursor: "pointer" } };
  }

  return (
    <div className="display-block soft-half-top">
      <h6 className={classes.join(" ")} style={style} onClick={onClick}>
        {text || "Give as Guest"}
      </h6>
    </div>
  );
};

Guest.propTypes = {
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  text: PropTypes.text,
};

export {
  PrimaryButton,
  SecondaryButton,
  Guest,
};
