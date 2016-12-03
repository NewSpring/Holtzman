/*
* small button
*
* <SmallButton
*   linkUrl={?string}
*   onClick={?Function}
*   disabled={Boolean}
*   text={string}
*   className={?string}
*   style={?Object}
* />
*/

/* eslint-disable */
import { storiesOf } from "@kadira/storybook";
import withReadme from "storybook-readme/with-readme";
import backgrounds from "react-storybook-addon-backgrounds";
import centered from "/.storybook/decorators/centered";
import defaultColors from "/.storybook/defaults";

import SmallButton from "../small";
import Readme from "./small-button.md";

const story = storiesOf("SmallButton", module)
  .addDecorator(centered)
  .addDecorator(backgrounds(defaultColors("light-primary", "light-secondary")))
  ;

story
  .add("Basic Small Button", withReadme(
    Readme,
    () => (
      <SmallButton text="See All"/>
    )
  ))
  .add("With Link", withReadme(
    Readme,
    () => (
      <SmallButton linkUrl="http://newspring.cc" text="See All"/>
    )
  ))
  .add("Disabled (no link)", withReadme(
    Readme,
    () => (
      <SmallButton disabled text="See All"/>
    )
  ))
  .add("Disabled (with link)", withReadme(
    Readme,
    () => (
      <SmallButton disabled linkUrl="http://newspring.cc" text="See All"/>
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
