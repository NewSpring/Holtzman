import PropTypes from "react";

function style(disabled) {
  if (disabled) {
    return {
      cursor: "inherit",
    };
  }

  return {};
}


const Label = ({ labelFor, labelName, disabled }) => (
  <label htmlFor={labelFor} style={style(disabled)} >
    {labelName}
  </label>
);

Label.propTypes = {
  labelFor: PropTypes.string,
  labelName: PropTypes.string,
  disabled: PropTypes.bool,
};

export default Label;
