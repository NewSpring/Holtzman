/* eslint-disable */
import { storiesOf } from "@storybook/react";
import withReadme from "storybook-readme/with-readme";
import backgrounds from "@storybook/addon-backgrounds";
import centered from "/.storybook/decorators/centered";
import defaultColors from "/.storybook/defaults";
import { withKnobs, select, text, boolean } from "@storybook/addon-knobs";

import SmallButton from "../SmallButton";
import Readme from "./small-button.md";

const classes = [
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
  .addDecorator(backgrounds(defaultColors("light-primary", "light-secondary")));

story
  .add(
    "Basic Small Button",
    withReadme(Readme, () => {
      const content = {
        className: "btn--dark-secondary",
        text: "See All",
      };

      // Change the className
      content.className = select("Class Name", classes, "btn--dark-secondary");

      // Disable the button
      const disableButton = boolean("Disable Button?", false);
      if (disableButton) {
        content.disabled = true;
      }

      // Change the button text
      content.text = text("Button Text", content.text);

      return <SmallButton {...content} />;
    }),
  )
  .add(
    "Small Button With onClick",
    withReadme(Readme, () => {
      const content = {
        className: "btn--dark-secondary",
        linkUrl: "http://newspring.cc",
        onClick: () => alert("button clicked!"),
        text: "See All",
      };

      // Change the className
      content.className = select("Class Name", classes, "btn--dark-secondary");

      // Change the button text
      content.text = text("Button Text", content.text);

      return <SmallButton {...content} />;
    }),
  );
