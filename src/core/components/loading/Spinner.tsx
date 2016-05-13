
// import  from "react";
import { HTMLProps } from "react";

// import Styles from "./spinner.css"

function getClasses(mergeClasses: string[]): string {
  let classes: string[] = [
    "loader"
  ];

  if (mergeClasses) {
    classes = classes.concat(mergeClasses);
  }

  return classes.join(" ");
};


export interface SpinnerProps {
  theme?: string;
  styles?: HTMLProps<HTMLStyleElement>;
  classes?: Array<string>;
}


const Spinner = ({ theme, styles, classes }: SpinnerProps) => (
  <div
      className={theme || getClasses(classes)}
      style={styles || {}}
  ></div>
);

export default Spinner;
