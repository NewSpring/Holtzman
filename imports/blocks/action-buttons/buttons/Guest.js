import { PropTypes } from "react";

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

  /* eslint-disable */
  return (
    <div className="display-block soft-half-top">
      <h6 className={classes.join(" ")} style={style} onClick={onClick}>
        {text || "Give as Guest"}
      </h6>
    </div>
  );

  /* eslint-enable */
};

Guest.propTypes = {
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  text: PropTypes.text,
};

export default Guest;
