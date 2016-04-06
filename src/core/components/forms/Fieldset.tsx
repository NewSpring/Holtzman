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
  children?: any;
};

const Fieldset = ({ theme, classes, children }: FieldSetProps) => (
  <fieldset className={ theme || getClasses(classes) }>
    {children}
  </fieldset>
);

export default Fieldset;
