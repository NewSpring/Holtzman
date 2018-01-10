/* eslint-disable */
import { storiesOf } from "@storybook/react";
import { withKnobs, text } from "@storybook/addon-knobs";
import withReadme from "storybook-readme/with-readme";
import backgrounds from "@storybook/addon-backgrounds";
import centered from "/.storybook/decorators/centered";
import defaultColors from "/.storybook/defaults";

import Readme from "./success.md";
import Success from "../Success";

const story = storiesOf("Icons", module)
  .addDecorator(withKnobs)
  .addDecorator(centered)
  .addDecorator(backgrounds(defaultColors("light-primary", "light-secondary")));

story.add(
  "Success",
  withReadme(Readme, () => {
    const title = text("Title", "Great Success!");
    const summary = text(
      "Summary",
      "You have completed some super cool action and we think you're pretty dang awesome for doing it. Give yourself a pat on the back and go on with your day.",
    );
    const button = text("Button", "Ok, Cool Thanks!");

    return (
      <div className="text-center">
        <Success />
        <h3 className="text-primary">{title}</h3>
        <p>{summary}</p>
        <div className="btn--dark-tertiary btn--small">{button}</div>
      </div>
    );
  }),
);
