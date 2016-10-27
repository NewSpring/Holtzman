/* eslint-disable import/no-extraneous-dependencies, import/no-unresolved, no-alert */
import { storiesOf } from "@kadira/storybook";
import {
  withKnobs,
  text,
  boolean,
} from "@kadira/storybook-addon-knobs";
import withReadme from "storybook-readme/with-readme";
import backgrounds from "react-storybook-addon-backgrounds";
import centered from "/.storybook/decorators/centered";
import defaultColors from "/.storybook/defaults";

import Readme from "./Guest.md";
import Guest from "../Guest";

const story = storiesOf("Action Buttons", module)
  .addDecorator(withKnobs)
  .addDecorator(centered)
  .addDecorator(backgrounds(defaultColors("light-primary", "light-secondary")))
  ;

story
  .add("Guest", withReadme(Readme, () => (
    <Guest
      disabled={boolean("disabled", false)}
      onClick={() => { alert("clicked"); }}
      text={text("text", "Give As Guest")}
    />
  )));
