/* eslint-disable */
import { storiesOf } from "@storybook/react";
import { withKnobs, boolean } from "@storybook/addon-knobs";
import withReadme from "storybook-readme/with-readme";
import backgrounds from "@storybook/addon-backgrounds";
import centered from "/.storybook/decorators/centered";
import defaultColors from "/.storybook/defaults";

import Readme from "./Secondary.md";
import SecondaryButton from "../Secondary";

const story = storiesOf("Buttons", module)
  .addDecorator(withKnobs)
  .addDecorator(centered)
  .addDecorator(backgrounds(defaultColors("light-primary", "light-secondary")));

story.add(
  "Secondary",
  withReadme(Readme, () => (
    <SecondaryButton
      disabled={boolean("Disable Button?", false)}
      onClick={() => {
        alert("clicked");
      }}
    />
  )),
);
