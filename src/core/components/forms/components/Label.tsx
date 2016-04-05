import React from "react";

function style(disabled: boolean): Object {
  if (disabled) {
    return {
      cursor: "inherit"
    };
  }

  return {};
}

export interface LabelProps {
  labelFor: string,
  labelName: string,
  disabled?: boolean
};

const Label = ({ labelFor, labelName, disabled }: LabelProps) => (
  <label htmlFor={labelFor} style={style(disabled)}>
    {labelName}
  </label>
);

export default Label;
