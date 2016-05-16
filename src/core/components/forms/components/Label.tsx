
// XXX figure out why enzyme needs this
import { HTMLProps } from "react";

function style(disabled: boolean): HTMLProps<HTMLStyleElement> | any {
  if (disabled) return { cursor: "inherit" };
  return {};
};

export declare interface LabelProps {
  labelFor: string;
  labelName: string;
  disabled?: boolean;
};

const Label = ({ labelFor, labelName, disabled }: LabelProps) => (
  <label htmlFor={labelFor} style={style(disabled)}>
    {labelName}
  </label>
);

export default Label;
