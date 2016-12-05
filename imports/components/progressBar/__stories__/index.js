/* eslint-disable */
import { storiesOf } from "@kadira/storybook";
import withReadme from "storybook-readme/with-readme";
import backgrounds from "react-storybook-addon-backgrounds";
import centered from "/.storybook/decorators/centered";
import defaultColors from "/.storybook/defaults";
import styled from "styled-components";

import ProgressBar from "../";
import Readme from "./progress-bar.md";

const story = storiesOf("ProgressBar", module)
  .addDecorator(centered)
  .addDecorator(backgrounds(defaultColors()))
  ;

story
  .add("Light", withReadme(
    Readme,
    () => (
      <ProgressBar
        title="My Fund"
        total="1000"
        percentDone="35"
        theme="light"
      />
    )
  ))
  .add("Dark", withReadme(
    Readme,
    () => (
      <ProgressBar
        title="My Fund"
        total="1000"
        percentDone="35"
      />
    )
  ));
