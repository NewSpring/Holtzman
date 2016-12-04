
/* eslint-disable */
import { storiesOf } from "@kadira/storybook";
import withReadme from "storybook-readme/with-readme";
import backgrounds from "react-storybook-addon-backgrounds";
import centered from "/.storybook/decorators/centered";
import defaultColors from "/.storybook/defaults";
import {
  withKnobs,
  select,
} from "@kadira/storybook-addon-knobs";

import SmallButton from "../small";
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

const story = storiesOf("SmallButton", module)
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
  .add("With Link", withReadme(
    Readme,
    () => (
      <SmallButton linkUrl="http://newspring.cc" text="See All"/>
    )
  ))
  .add("Disabled", withReadme(
    Readme,
    () => (
      <SmallButton disabled text="See All"/>
    )
  ))
  .add("With onClick Action", withReadme(
    Readme,
    () => (
      <SmallButton
        linkUrl="http://newspring.cc"
        text="See All"
        onClick={() => alert("button clicked!")}
      />
    )
  ));
