import * as React from "react"
import { Component, PropTypes } from 'react'

function getClasses(mergeClasses: Array<string>): string{
  let classes: string[] = [
    "flush-bottom"
  ];

  if (mergeClasses) {
    classes = classes.concat(mergeClasses);
  }

  return classes.join(" ");
};

export interface FieldSetProps {
  theme?: string;
  classes?: string[];
};

const Fieldset = ({ theme, classes }: FieldSetProps) => (
  <fieldset className={ theme || getClasses(classes) }>
    {this.props.children}
  </fieldset>
);

export default Fieldset;
