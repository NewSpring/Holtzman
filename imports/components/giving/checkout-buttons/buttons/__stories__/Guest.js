/* eslint-disable */
import { storiesOf } from "@storybook/react";
import { withKnobs, text, boolean } from "@storybook/addon-knobs";
import withReadme from "storybook-readme/with-readme";
import backgrounds from "@storybook/addon-backgrounds";
import centered from "/.storybook/decorators/centered";
import defaultColors from "/.storybook/defaults";

import Readme from "./Guest.md";
import Guest from "../Guest";

const story = storiesOf("Buttons", module)
  .addDecorator(withKnobs)
  .addDecorator(centered)
  .addDecorator(backgrounds(defaultColors("light-primary", "light-secondary")));

story.add(
  "Guest",
  withReadme(Readme, () => (
    <Guest
      disabled={boolean("disabled", false)}
      onClick={() => {
        alert("clicked");
      }}
      text={text("text", "Give As Guest")}
    />
  )),
);
