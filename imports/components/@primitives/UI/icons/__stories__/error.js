/* eslint-disable */
import { storiesOf } from "@storybook/react";
import { withKnobs, text } from "@storybook/addon-knobs";
import withReadme from "storybook-readme/with-readme";
import backgrounds from "@storybook/addon-backgrounds";
import centered from "/.storybook/decorators/centered";
import defaultColors from "/.storybook/defaults";

import Readme from "./error.md";
import Error from "../Error";

const story = storiesOf("Icons", module)
  .addDecorator(withKnobs)
  .addDecorator(centered)
  .addDecorator(backgrounds(defaultColors("light-primary", "light-secondary")));

story.add(
  "Error",
  withReadme(Readme, () => {
    const title = text("Title", "Something Terrible Has Happened!");
    const summary = text(
      "Description",
      "Oh no! It looks like you've encountered a grave and catastrophic error. Please do not pass go, do not collect $200. Throw your computer straight in the trash.",
    );
    const button = text("Button", "Feelsbadman");

    return (
      <div className="text-center">
        <Error />
        <h3 className="text-alert">{title}</h3>
        <p>{summary}</p>
        <div className="btn--dark-tertiary btn--small">{button}</div>
      </div>
    );
  }),
);
