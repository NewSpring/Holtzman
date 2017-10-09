
/* eslint-disable */
import { storiesOf } from '@storybook/react';
import withReadme from "storybook-readme/with-readme";
import backgrounds from "react-storybook-addon-backgrounds";
import centered from "/.storybook/decorators/centered";
import defaultColors from "/.storybook/defaults";
import {
  withKnobs,
  select,
} from '@storybook/addon-knobs';

import SmallButton from "../SmallButton";
import Readme from "./small-button.md";

const classes=[
  "btn--disabled",
  "btn--corners",
  "btn--light",
  "btn--filled",
  "btn--dark-primary",
  "btn--dark-secondary",
  "btn--dark-tertiary",
  "btn--alert",
];

const story = storiesOf("Buttons", module)
  .addDecorator(withKnobs)
  .addDecorator(centered)
  .addDecorator(backgrounds(defaultColors("light-primary", "light-secondary")))
  ;

story
  .add("Basic Small Button", withReadme(
    Readme,
    () => (
      <SmallButton
        text="See All"
        className={select("className", classes, "btn--dark-secondary")}
      />
    )
  ))
  .add("Small Button With onClick", withReadme(
    Readme,
    () => (
      <SmallButton
        linkUrl="http://newspring.cc"
        text="See All"
        onClick={() => alert("button clicked!")}
      />
    )
  ));
