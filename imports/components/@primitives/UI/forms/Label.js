import PropTypes from "react";

function style(disabled, labelStyles) {
  if (disabled) {
    return {
      ...labelStyles,
      cursor: "inherit",
    };
  }

  return labelStyles;
}

const Label = ({ labelFor, labelName, disabled, labelStyles }) =>
  (<label htmlFor={labelFor} style={style(disabled, labelStyles)}>
    {labelName}
  </label>);

Label.propTypes = {
  labelFor: PropTypes.string,
  labelName: PropTypes.string,
  disabled: PropTypes.bool,
  labelStyles: PropTypes.object, // eslint-disable-line
};

export default Label;
