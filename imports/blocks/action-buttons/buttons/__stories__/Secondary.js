/* eslint-disable import/no-extraneous-dependencies, import/no-unresolved, no-alert */
import { storiesOf } from "@kadira/storybook";
import {
  withKnobs,
  boolean,
} from "@kadira/storybook-addon-knobs";
import withReadme from "storybook-readme/with-readme";
import backgrounds from "react-storybook-addon-backgrounds";
import centered from "/.storybook/decorators/centered";
import defaultColors from "/.storybook/defaults";

import Readme from "./Secondary.md";
import SecondaryButton from "../Secondary";

const story = storiesOf("Action Buttons", module)
  .addDecorator(withKnobs)
  .addDecorator(centered)
  .addDecorator(backgrounds(defaultColors("light-primary", "light-secondary")))
  ;

story
  .add("Secondary", withReadme(Readme, () => (
    <SecondaryButton
      disabled={boolean("disabled", false)}
      onClick={() => { alert("clicked"); }}
    />
  )));
